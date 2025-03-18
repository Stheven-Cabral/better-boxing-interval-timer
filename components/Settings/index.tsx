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

  const setSettingsValues = () => {
    const roundsInput = document.getElementById("rounds") as HTMLInputElement;
    const roundMinutesInput = document.getElementById(
      "time-per-round-minutes"
    ) as HTMLInputElement;
    const roundSecondsInput = document.getElementById(
      "time-per-round-seconds"
    ) as HTMLInputElement;
    const breakMinutesInput = document.getElementById(
      "time-per-round-seconds"
    ) as HTMLInputElement;
    const breakSecondsInput = document.getElementById(
      "time-per-round-seconds"
    ) as HTMLInputElement;

    console.log(roundsInput.value);
    console.log(roundMinutesInput.value);
    console.log(roundSecondsInput.value);
    console.log(breakMinutesInput.value);
    console.log(breakSecondsInput.value);
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
            htmlFor="time-per-round-minutes"
          >
            Time per Round (MM:SS):
          </label>
          <div className="time-input-group">
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
          <label className="settings-input-label" htmlFor="break-time">
            Break Time (MM:SS):
          </label>
          <div className="time-input-group">
            <input
              className="settings-input"
              type="number"
              id="break-time-minutes"
              placeholder="00"
              min="0"
              max="59"
            />
            <span className="settings-input-colon">:</span>
            <input
              className="settings-input"
              type="number"
              id="break-time-seconds"
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
