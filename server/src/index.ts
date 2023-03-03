const express = require('express');
import http from 'http';
import { Server, Socket } from 'socket.io';
import { generateRandomName, makeid } from './utils';
import { gameLoop, getRandomFlag } from './game';
const maxUsers = 25;

export interface Player {
  id: string;
  name: string;
  points: number;
  room: string;
  guess: boolean;
  correct: boolean;
}
export const players: Player[] = [];

export interface RoomGameMetadata {
  roomName: string;
  countryString: string;
  round: number;
}
export const gameMeta: RoomGameMetadata[] = [];

const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: '*',
  },
  pingTimeout: 120000,
  pingInterval: 5000,
});

const clientRooms: { [key: string]: string } = {};
interface Room {
  sockets: Set<Socket>;
}

function getPlayersInRoom(roomName: string) {
  const playersInRoom = players.filter((player) => player.room === roomName);
  return playersInRoom;
}

io.on('connection', (socket: Socket) => {
  socket.on('newGame', handleNewGame);
  socket.on('joinGame', handleJoinGame);
  socket.on('clientReady', handleClientReady);
  socket.on('cgameStart', handleGameStart);
  socket.on('pickString', handlepickString);
  socket.on('disconnect', () => {
    removePlayer(socket);
  });
  socket.on('getPlayerinRoom', getPlayersInRoom);

  function handleJoinGame(roomName: string) {
    const room: Room = io.sockets.adapter.rooms.get(roomName) as unknown as Room;
    if (room) {
      clientRooms[socket.id] = roomName;
      socket.join(roomName);
      socket.emit('gameCodeoc', roomName);
    } else {
      socket.emit('unknownCode');
    }
  }

  function handleNewGame() {
    let roomName = makeid(5);
    clientRooms[socket.id] = roomName;
    socket.emit('gameCode', roomName);
    socket.join(roomName);
  }

  function handleClientReady() {
    const roomName = clientRooms[socket.id];
    if (!roomName) {
      return;
    }
    const player = createPlayer(roomName as string, socket.id);
    io.to(roomName).emit('update-players', getPlayersInRoom(roomName));
  }

  function removePlayer(socket: Socket) {
    const roomName = clientRooms[socket.id];
    if (!roomName) {
      return;
    }
    socket.leave(roomName);
    const playerIndex = players.findIndex((player) => {
      return player.id === socket.id;
    });
    if (playerIndex !== -1) {
      players.splice(playerIndex, 1);
    }
    io.to(roomName).emit('update-players', getPlayersInRoom(roomName));
  }

  function handlepickString(pickWord: string, timer : number){
    const roomName = clientRooms[socket.id];
    if (!roomName) {
      return;
    }
    const roomMeta = gameMeta.find((room) => room.roomName === roomName);
    if (!roomMeta) {
      return;
    }
    const playerdata = players.find((player) => player.id === socket.id);
      if (playerdata) {
        if (playerdata.guess) {
          return;
        }
      if (pickWord.toLowerCase() === roomMeta.countryString.toLowerCase()) {
          playerdata.points += 10 + timer;
          playerdata.guess = true;
        gameSetPersonString(socket.id, roomMeta.countryString + "✔️")
        io.to(roomName).emit('update-players', getPlayersInRoom(roomName));
      } else {
        let newString = buildHiddenName(roomMeta.countryString, pickWord);
        gameSetPersonString(socket.id, newString)
      }
    }
  }

  function handleGameStart() {
    const roomName = clientRooms[socket.id];
    if (!roomName) {
      return;
    }
    io.to(roomName).emit('gameStarted');
    gameLoop(roomName);
  }

  socket.on('rename-player', (name: string) => {
    const roomName = clientRooms[socket.id];
    const player = players.find((player) => player.id === socket.id);
    if (player) {
      player.name = name;
    }
    io.to(roomName).emit('update-players', getPlayersInRoom(roomName));
  });

});

server.listen(3001, () => {
  console.log('✔️ Server listening on port 3001');
});


function createPlayer(roomName: string, socketId: any) {
  const id = socketId;
  const name = generateRandomName();
  const player: Player = {
  id,
  name,
  points: 0,
  guess: false,
  correct: false,
  room: roomName,
  };
  players.push(player);
  return player;
}

export async function gameCountdown(roomName: string, timer: number): Promise<void> {
  const room: Room = io.sockets.adapter.rooms.get(roomName) as unknown as Room;
  const roomMeta = gameMeta.find((room) => room.roomName === roomName);
  const [randomKey, countryString] = getRandomFlag();

  if (!roomMeta) {
    const newRoomMeta: RoomGameMetadata = {
      roomName,
      countryString: countryString,
      round: 1,
    };
    gameSetRound(roomName, newRoomMeta.round);
    gameMeta.push(newRoomMeta);
    gameSetRoomString(roomName, buildHiddenName(countryString));
    gameSetFlag(roomName, randomKey);
  } else {
    if (roomMeta.round === 10) {
      io.to(roomName).emit('gameEnd', getPlayersPoints(roomName));
      return;
    }
    roomMeta.countryString = countryString;
    roomMeta.round++;
    gameMeta.push(roomMeta);
    gameSetRound(roomName, roomMeta.round);
  }

  gameSetRoomString(roomName, buildHiddenName(countryString));
  gameSetFlag(roomName, randomKey);
  io.to(roomName).emit('gameSetFlag', randomKey);
  let counter = timer + Math.round(countryString.length * 0.75);
  await new Promise((resolve) => {
    const countdownInterval = setInterval(() => {
      const playersInRoom = getPlayersInRoom(roomName);
      const allGuessed = playersInRoom.every((player: { guess: boolean; }) => player.guess === true);
      if (allGuessed) {
        clearInterval(countdownInterval);
        resolve('stop');
      }
      counter--;
      io.to(roomName).emit('gameCountdown', counter);
      if (counter === 0) {
        clearInterval(countdownInterval);
        resolve('stop');
      }
    }, 1000);
  });
  if (roomMeta) {
    roomMeta.countryString = generateRandomName();
    gameMeta.push(roomMeta);
  }
  const playersInRoom = getPlayersInRoom(roomName);
  playersInRoom.forEach((player: { guess: boolean; }) => {
    player.guess = false;
  });
  io.to(roomName).emit('update-players', playersInRoom);
  gameSetRoomString(roomName, countryString);
  await new Promise((resolve) => {
    let outTimer = 5;
    const countdownInterval = setInterval(() => {
      outTimer--;
      io.to(roomName).emit('gameCountdown', outTimer);
      if (outTimer === 0) {
        clearInterval(countdownInterval);
        resolve('stop');
      }
    }, 1000);
  });
  gameCountdown(roomName, 15);
}

export async function gameSetFlag(roomName: string, flagKey: string): Promise<void> {
  const room: Room = io.sockets.adapter.rooms.get(roomName) as unknown as Room;
  if (!room) {
    return
  }
  io.to(roomName).emit('gameSetFlag', flagKey);
}

export async function gameSetRoomString(roomName: string, roomString: string): Promise<void> {
  const room: Room = io.sockets.adapter.rooms.get(roomName) as unknown as Room;
  if (!room) {
    return
  }
  io.to(roomName).emit('gameSetroomString', roomString);
}

export async function gameSetRound(roomName: string, gameRounds: number): Promise<void> {
  const room: Room = io.sockets.adapter.rooms.get(roomName) as unknown as Room;
  if (!room) {
    return
  }
  io.to(roomName).emit('gameRounds', gameRounds);
}

export async function gameSetPersonString(socketId: string, roomString: string): Promise<void> {
  io.to(socketId).emit('gameSetroomString', roomString);
}

export function getPlayersPoints(roomName: string): Player[] {
  const playersInRoom = players.filter((player) => player.room === roomName);
  playersInRoom.sort((a, b) => b.points - a.points);
  return playersInRoom;
}

export function buildHiddenName(name: string, guess: string = ''): string {
  return name.split('').map((char: string, index: number) => {
    if (guess.charAt(index).toLowerCase() === char.toLowerCase()) {
      return name.charAt(index);
    } else if (char === ' ') {
      return 'ㅤ';
    } else if (char === '-') {
      return '-';
    } else {
      return '_';
    }
  }).join(' ');
}
