"use client";

import { useState, useEffect } from "react";
import Settings from "@/components/Settings";
import styles from "./page.module.css";

export default function Home() {
  const [time, setTime] = useState(0);
  const [round, setRound] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  //Effect for handling window size

  const handleResize = () => {
    setIsDesktop(window.innerWidth >= 1280);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Effect for handling time
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
    <main>
      <div className="device">
        <div className="timer">
          <div className="round">{round}</div>
          {isDesktop && <div className="separator">-</div>}
          <div className="time">{formatTime(time)}</div>
        </div>
        <div className="controls">
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
          <button
            className="settings-open-button px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setSettingsOpen(!settingsOpen)}
          >
            Settings
          </button>
        </div>
      </div>
      <Settings
        className={settingsOpen ? "open" : ""}
        setSettingsOpen={setSettingsOpen}
      />
    </main>
  );
}
