"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useSession } from "next-auth/react";
import UserInfo from "src/components/ds/username";
import { Levelprogressbar } from "src/components/my/progressbar";
import { socket } from "@utils/game-socket";
import { getBackendURL } from "@utils/game-api";

export default function FlagGameEnd(): JSX.Element {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const { data: session } = useSession();
  const [currentPoints, setCurrentPoints] = useState(0);
  const [startPoints, setStartPoints] = useState(0);
  const [level, setLevel] = useState(0);
  const [endPoints, setEndPoints] = useState(100);
  const [loading, setLoading] = useState(true);
  const [xpGained, setXpGained] = useState(0);
  const [playerData, setPlayerData] = useState<
    { name: string; level: number; score: number }[]
  >([]);

  useEffect(() => {
    async function fetchUserData() {
      if (session) {
        try {
          const response = await fetch(`${getBackendURL()}/player/level`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${session.user.id}`,
            },
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          setCurrentPoints(data.currentPoints);
          setStartPoints(data.rangeStart);
          setEndPoints(data.rangeEnd);
          setLevel(data.currentLevel);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchUserData();
  }, [session]);

  useEffect(() => {
    socket.on("playerData", (data) => {
      setPlayerData([...data].sort((a, b) => b.score - a.score));
    });

    socket.on("xpGained", (xp) => {
      setXpGained(xp);
    });

    return () => {
      socket.off("playerData");
      socket.off("xpGained");
    };
  }, []);

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const audio = new Audio("/sounds/gameend.mp3");
    audio.volume = 0.5;
    audio.play();
  }, []);

  const podiumVariants = {
    initial: {
      scale: 0,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.8,
        delay: 0.3,
      },
    },
  };

  return (
    <div className="mt-3 ">
      <Confetti width={windowSize.width} height={windowSize.height} />
      <div className="justify-center items-center flex flex-col">
        {!session?.user && (
          <div className="bg-red-500 text-white p-2 rounded mt-2 max-w-sm">
            <p className="text-sm">
              You played as a guest. Next time, sign in to save your progress.
            </p>
          </div>
        )}
        <h1 className="text-4xl font-bold mt-2 sm:text-6xl">Game Over</h1>
        <p className="text-sm pb-2">Thanks for playing!</p>
        <p className="text-sm pb-2 text-gttred">
          This game is in beta. If you see a bug, please report it.
        </p>
        {playerData.length <= 2 && (
          <div className="relative">
            {playerData.map((user, index) => (
              <div
                key={index}
                className={`w-80 h-20 bg-gttlightpurple/30 rounded-md flex flex-col justify-center items-center p-2 m-2`}
              >
                <span className="text-lg font-bold ">{user.name}</span>
                <span className="text-sm">{user.score} pts</span>
                <span className="text-xl font-bold">
                  {index + 1}
                  {["st", "nd", "rd"][index]}
                </span>
              </div>
            ))}
          </div>
        )}
        {playerData.length > 2 && (
          <div className="space-x-2 flex justify-center items-end mb-4">
            <motion.div
              key={1}
              className={`w-32 h-36 bg-gttlightpurple/25 rounded-md flex flex-col justify-center items-center p-2`}
              variants={podiumVariants}
              initial="initial"
              animate="animate"
              custom={0.1}
            >
              <span className="text-lg font-bold text-balance">
                {playerData[1]?.name}
              </span>
              <span className="text-sm">{playerData[1]?.score} pts</span>
              <span className="text-xl font-bold">2nd</span>
            </motion.div>
            <motion.div
              key={0}
              className={`w-32 h-48 bg-gttlightpurple/40 rounded-md flex flex-col justify-center items-center p-2`}
              variants={podiumVariants}
              initial="initial"
              animate="animate"
              custom={0.2}
            >
              <span className="text-lg font-bold text-balance">
                {playerData[0]?.name}
              </span>
              <span className="text-sm">{playerData[0]?.score} pts</span>
              <span className="text-xl font-bold">1st</span>
            </motion.div>
            <motion.div
              key={2}
              className={`w-32 h-32 bg-gttlightpurple/25 rounded-md flex flex-col justify-center items-center p-2`}
              variants={podiumVariants}
              initial="initial"
              animate="animate"
              custom={0.3}
            >
              <span className="text-lg font-bold text-balance">
                {playerData[2]?.name}
              </span>
              <span className="text-sm">{playerData[2]?.score} pts</span>
              <span className="text-xl font-bold">3rd</span>
            </motion.div>
          </div>
        )}
        {playerData.length > 3 && (
          <div className="mt-2 relative">
            <table className="w-96 divide-y divide-gray-200 text-sm text-center">
              <tbody className=" divide-y divide-gray-200">
                {playerData.slice(3).map((user, index) => (
                  <tr key={index}>
                    <td className="px-6 py-2 whitespace-nowrap">
                      <UserInfo name={user.name} level={user.level} />
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap">
                      {user.score}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {session?.user &&
          (loading ? (
            <div className="text-lg font-bold">Loading...</div>
          ) : (
            <div className="mt-4 text-center w-96">
              {xpGained > 0 && (
                <div className="text-lg font-bold">
                  You earned {xpGained} points!
                </div>
              )}
              <div className="text-sm">You are now level {level}</div>
              <div className="">
                <Levelprogressbar
                  currentPoints={currentPoints}
                  rangeStart={startPoints}
                  rangeEnd={endPoints}
                />
              </div>
            </div>
          ))}
        <div className="mt-4">
          <button
            className="p-4 bg-blue-500 text-white rounded"
            onClick={() => window.location.replace("/")}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
