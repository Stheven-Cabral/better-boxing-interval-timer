"use client";

import { useState, useEffect } from "react";
import Settings from "@/components/Settings";
import styles from "./page.module.css";

export default function Home() {
  const [rounds, setRounds] = useState(1);
  const [roundMinutes, setRoundMinutes] = useState(0);
  const [roundSeconds, setRoundSeconds] = useState(0);
  const [breakMinutes, setBreakMinutes] = useState(0);
  const [breakSeconds, setBreakSeconds] = useState(0);
  const [isRoundRunning, setIsRoundRunning] = useState(false);
  const [isBreakRunning, setIsBreakRunning] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

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

  const formatRoundTime = (minutes: number, seconds: number) => {
    const mins = minutes;
    const secs = seconds;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const startTimer = () => setIsRoundRunning(true);
  const pauseTimer = () => setIsRoundRunning(false);
  const resetTimer = () => {
    setRoundMinutes(0);
    setRoundSeconds(0);
    setBreakMinutes(0);
    setBreakSeconds(0);
    setRounds(1);
    setIsRoundRunning(false);
  };

  return (
    <main>
      <div className="device">
        <div className="timer">
          <div className="round">{rounds}</div>
          {isDesktop && <div className="separator">-</div>}
          {!isBreakRunning ? (
            <div className="round-time">
              {formatRoundTime(roundMinutes, roundSeconds)}
            </div>
          ) : (
            <div className="break-time">
              {formatRoundTime(breakMinutes, breakSeconds)}
            </div>
          )}
        </div>
        <div className="controls">
          <button className="bg-green-500 rounded" onClick={startTimer}>
            Start
          </button>
          <button className="bg-yellow-500 rounded" onClick={pauseTimer}>
            Pause
          </button>
          <button className="bg-red-500 rounded" onClick={resetTimer}>
            Reset Time
          </button>
          <button
            className="settings-open-button bg-blue-500 text-white rounded"
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
