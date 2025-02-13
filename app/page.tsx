"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [time, setTime] = useState(0);
  const [round, setRound] = useState(1);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setTime(0);
    setRound(1);
    setIsRunning(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black">
      <div className="timer">
        <div className="round">{round}</div>
        <div className="separator">-</div>
        <div className="time">{formatTime(time)}</div>
      </div>
      <div className="mt-4 space-x-2">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={startTimer}
        >
          Start
        </button>
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded"
          onClick={pauseTimer}
        >
          Pause
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={resetTimer}
        >
          Reset Time
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Settings
        </button>
      </div>
    </main>
  );
}
