import { useEffect, useState } from "react";

export const Settings = ({
  className,
  setSettingsOpen,
}: {
  className?: string;
  setSettingsOpen: (open: boolean) => void;
}) => {
  const handleSettingsOutsideClick = (event: MouseEvent) => {
    if (
      !(event.target as Element)?.closest("#settings") &&
      !(event.target as Element)?.closest(".settings-open-button")
    ) {
      setSettingsOpen(false);
    }
  };

  const validateRoundsInput = (roundsInput: HTMLInputElement) => {
    const maxValue = 100;
    const inputValue = parseInt(roundsInput.value, 10);
    const errorElement = document.getElementById("rounds-error");

    if (isNaN(inputValue) || inputValue < 1 || inputValue > maxValue) {
      errorElement!.textContent = `Invalid rounds input value: ${roundsInput.value}. Please enter a value between 1 and ${maxValue}.`;
      return false;
    } else {
      errorElement!.textContent = "";
    }

    return true;
  };

  const validateTimeInput = (
    timeInput: HTMLInputElement,
    type: "minutes" | "seconds",
    errorElementId: string
  ) => {
    const secondsMaxValue = 59;
    const inputValue = parseInt(timeInput.value, 10);
    const errorElement = document.getElementById(errorElementId);
    console.log("validateTimeInput");

    if (type === "minutes") {
      if (isNaN(inputValue)) {
        errorElement!.textContent = `Invalid minutes input value: ${timeInput.value}. Please enter a valid number.`;
        return false;
      } else {
        errorElement!.textContent = "";
      }
    } else if (type === "seconds") {
      if (isNaN(inputValue) || inputValue < 0 || inputValue > secondsMaxValue) {
        errorElement!.textContent = `Invalid seconds input value: ${timeInput.value}. Please enter a value between 0 and ${secondsMaxValue}.`;
        return false;
      } else {
        errorElement!.textContent = "";
      }
    }

    return true;
  };

  const setSettingsValues = () => {
    const roundsInput = document.getElementById("rounds") as HTMLInputElement;
    const roundMinutesInput = document.getElementById(
      "time-per-round-minutes"
    ) as HTMLInputElement;
    const roundSecondsInput = document.getElementById(
      "time-per-round-seconds"
    ) as HTMLInputElement;
    const breakMinutesInput = document.getElementById(
      "time-per-round-minutes"
    ) as HTMLInputElement;
    const breakSecondsInput = document.getElementById(
      "time-per-round-seconds"
    ) as HTMLInputElement;

    if (
      !validateRoundsInput(roundsInput) ||
      !validateTimeInput(
        roundMinutesInput,
        "minutes",
        "minutes-per-round-error"
      ) ||
      !validateTimeInput(
        roundSecondsInput,
        "seconds",
        "seconds-per-round-error"
      ) ||
      !validateTimeInput(
        breakMinutesInput,
        "minutes",
        "minutes-per-break-error"
      ) ||
      !validateTimeInput(
        breakSecondsInput,
        "seconds",
        "seconds-per-break-error"
      )
    ) {
      return;
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleSettingsOutsideClick);

    return () => {
      window.removeEventListener("click", handleSettingsOutsideClick);
    };
  }, []);

  return (
    <div id="settings" className={`settings ${className}`}>
      <div
        className="settings-close-button-container"
        onClick={() => setSettingsOpen(false)}
      >
        <button className="settings-close-button">x</button>
      </div>
      <div className="settings-inputs">
        <div className="settings-input-container">
          <label className="settings-input-label" htmlFor="rounds">
            Rounds:
          </label>
          <div className="rounds-input-group">
            <p id="rounds-error" style={{ color: "red" }}></p>
            <input
              className="settings-input rounds-input"
              type="number"
              id="rounds"
            />
          </div>
        </div>

        <div className="settings-input-container">
          <label
            className="settings-input-label"
            htmlFor="time-per-round-minutes time-per-round-seconds"
          >
            Time per Round (MM:SS):
          </label>
          <div className="time-input-group">
            <p id="minutes-per-round-error" style={{ color: "red" }} />
            <p id="seconds-per-round-error" style={{ color: "red" }} />
            <input
              className="settings-input"
              type="number"
              id="time-per-round-minutes"
              placeholder="00"
              min="0"
              max="59"
            />
            <span className="settings-input-colon">:</span>
            <input
              className="settings-input"
              type="number"
              id="time-per-round-seconds"
              placeholder="00"
              min="0"
              max="59"
            />
          </div>
        </div>

        <div className="settings-input-container">
          <label
            className="settings-input-label"
            htmlFor="time-per-break-minutes time-per-break-seconds"
          >
            Break Time (MM:SS):
          </label>
          <div className="time-input-group">
            <p id="minutes-per-break-error" style={{ color: "red" }} />
            <p id="seconds-per-break-error" style={{ color: "red" }} />
            <input
              className="settings-input"
              type="number"
              id="time-per-break-minutes"
              placeholder="00"
              min="0"
              max="59"
            />
            <span className="settings-input-colon">:</span>
            <input
              className="settings-input"
              type="number"
              id="time-per-break-seconds"
              placeholder="00"
              min="0"
              max="59"
            />
          </div>
        </div>
      </div>
      <div className="settings-button-container">
        <button
          onClick={() => setSettingsValues()}
          className="settings-button bg-blue-500"
          type="submit"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Settings;
