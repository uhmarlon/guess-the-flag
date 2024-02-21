import type {NextPage} from "next";
import {useEffect, useRef, useState} from "react";
import Head from "next/head";
import Gamejoincreate from "../components/Gamejoin";
import Lobby from "../components/Lobby";
import {useGameToken, useLobby} from "../utils/game";
import {socket} from "../core/gameSocket";
import {LicensePlate} from "../components/LicensePlate";

export interface Player {
    id: string;
    name: string;
    points: number;
    guess: boolean;
    correct: boolean;
}

export const guessTheLicensePlate: NextPage = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const {inLobby, setinLobby} = useLobby();
    const {gameToken, setgameToken} = useGameToken();

    const [timeLeft, setTimeLeft] = useState(0);
    const [abbreviation, setAbbreviation] = useState("MD");
    const [city, setCity] = useState("Germany");
    const [gameRounds, setgameRounds] = useState(0);
    const [maxGameRounds, setmaxGameRounds] = useState(0);

    const [gameCreator, setGameCreator] = useState<boolean>(false);
    const [inGame, setInGame] = useState<boolean>(false);

    const [suffix, setSuffix] = useState("LW 2016");

    useEffect(() => {
        socket.on("gameCode", (gameCode) => {
            setinLobby(true);
            setGameCreator(true);
            setgameToken(gameCode);
            socket.emit("clientReady");
        });

        socket.on("gameStarted", () => {
            setInGame(true);
        });

        socket.on("gameRounds", (gameRounds, maxRounds) => {
            setgameRounds(gameRounds);
            setmaxGameRounds(maxRounds);
        });

        socket.on("gameCountdown", (timeLeft) => {
            setTimeLeft(timeLeft);
        });

        socket.on("gameSetAbbreviation", (abbreviation) => {
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const numbers = '0123456789';

            const getRandomElement = (elements: string) => elements[Math.floor(Math.random() * elements.length)];

            const letter = getRandomElement(letters);
            const number = (
                getRandomElement(numbers) +
                getRandomElement(numbers) +
                getRandomElement(numbers) +
                getRandomElement(numbers)
            );

            setSuffix(`${letter}${letter} ${number}`);
            setAbbreviation(abbreviation);
        });

        socket.on("gameSetroomString", (roomString) => {
            setCity(roomString);
        });

        socket.on("update-players", (players: Player[]) => {
            console.log(players);

            const playerList = document.getElementById(
                "playerlistgame"
            ) as HTMLElement;
            if (playerList) {
                playerList.innerHTML = "";
                players.sort((a, b) => b.points - a.points);
                players.forEach((player) => {
                    const li = document.createElement("li");
                    li.textContent = player.name + " | " + player.points;
                    playerList.appendChild(li);
                });
            }
        });
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            socket.emit("pickString", e.currentTarget.value, timeLeft);
            e.currentTarget.value = "";
        }
    };


    return (
        <>
            <Head>
                <title>Guess The License Plate</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            {!inLobby ? (
                <Gamejoincreate gameType="LicensePlate"/>
            ) : (
                <Lobby gameToken={gameToken} startbutton={gameCreator}/>
            )}

            <main className="mt-28">
                <h1 className="text-4xl text-center mb-2">Guess The License Plate</h1>
                <h2 className="text-1xl text-center mb-2">
                    Runde: {gameRounds}/{maxGameRounds}
                </h2>
                <div className="flex justify-center mb-6 px-8 sm:px-20">
                    <LicensePlate abbreviation={abbreviation} text={suffix}/>
                </div>
                <div className="flex justify-center">
                    <h1 className="text-4xl">{city}</h1>
                </div>
                <div className="flex justify-center mb-2">
                    <h1 className="text-xl">{timeLeft} sek.</h1>
                </div>
                <div className="flex justify-center mb-4">
                    <input
                        ref={inputRef}
                        type="text"
                        name="Eingabe"
                        placeholder="Stadt eingeben"
                        onKeyDown={handleKeyDown}
                        className="px-3 py-3 text-white border rounded-lg bg-gray-800 border-gray-600 w-72 focus:border-blue-500 focus:outline-none focus:ring"
                    />
                </div>

                <div className="flex justify-center mb-1">
                    <h1 className="text-2xl">Spieler</h1>
                </div>

                <div className="flex justify-center mb-4">
                    <div className="bg-gray-600 text-center rounded-lg w-72">
                        <ul id="playerlistgame" className=" text-white"></ul>
                    </div>
                </div>
            </main>
        </>
    );
};

export default guessTheLicensePlate;