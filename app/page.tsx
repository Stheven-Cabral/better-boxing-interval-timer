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
  const [roundIntervalId, setRoundIntervalId] = useState<number | null>(null);
  const [breakIntervalId, setBreakIntervalId] = useState<number | null>(null);

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

  const startRoundTimer = () => {
    setIsRoundRunning(true);
    const intervalTimer = setInterval(() => {
      setRoundSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          setRoundMinutes((prevMinutes) => {
            if (prevMinutes === 0) {
              // Timer finished
              setIsRoundRunning(false);
              setIsBreakRunning(true);
              startBreakTimer();
              clearInterval(roundIntervalId as number);
              return 0;
            } else {
              return prevMinutes - 1;
            }
          });
          return 59;
        } else {
          return prevSeconds - 1;
        }
      });
    }, 1000);
    setRoundIntervalId(intervalTimer as unknown as number);
  };

  const startBreakTimer = () => {
    setIsBreakRunning(true);
    const intervalTimer = setInterval(() => {
      setBreakSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          setBreakMinutes((prevMinutes) => {
            if (prevMinutes === 0) {
              // Timer finished
              setIsBreakRunning(false);
              setIsRoundRunning(true);
              clearInterval(breakIntervalId as number);
              return 0;
            } else {
              return prevMinutes - 1;
            }
          });
          return 59;
        } else {
          return prevSeconds - 1;
        }
      });
    }, 1000);
    setBreakIntervalId(intervalTimer as unknown as number);
  };

  const pauseRoundTimer = () => {
    setIsRoundRunning(false);
    clearInterval(roundIntervalId as number);
    console.log("Started interval with ID:", roundIntervalId);
  };

  const pauseBreakTimer = () => {
    setIsBreakRunning(false);
    clearInterval(breakIntervalId as number);
    console.log("Started interval with ID:", breakIntervalId);
  };

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
          {(!isRoundRunning && !isBreakRunning) ||
          (isRoundRunning && !isBreakRunning) ? (
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
          <button
            className="bg-green-500 rounded timer-start-button"
            onClick={
              isRoundRunning && !isBreakRunning
                ? startRoundTimer
                : startBreakTimer
            }
          >
            Start
          </button>
          <button
            className="bg-yellow-500 rounded timer-pause-button"
            onClick={
              isRoundRunning && !isBreakRunning
                ? pauseRoundTimer
                : pauseBreakTimer
            }
          >
            Pause
          </button>
          <button
            className="bg-red-500 rounded timer-reset-button"
            onClick={resetTimer}
          >
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
        setRoundMinutes={setRoundMinutes}
        setRoundSeconds={setRoundSeconds}
        setBreakMinutes={setBreakMinutes}
        setBreakSeconds={setBreakSeconds}
      />
    </main>
  );
}
