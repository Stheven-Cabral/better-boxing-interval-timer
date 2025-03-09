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
            <input className="settings-input" type="number" id="rounds" />
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
        <button className="settings-button" type="submit">
          Save
        </button>
      </div>
    </div>
  );
};

export default Settings;
