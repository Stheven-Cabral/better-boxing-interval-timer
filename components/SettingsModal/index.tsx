export const SettingsModal = () => {
  return (
    <div className="modal-container">
      <div id="modal" className="modal">
        <div
          className="modal-close"
          onClick={() => {
            const modal = document.getElementById("modal");
            if (modal) {
              modal.style.display = "none";
            }
          }}
        >
          x
        </div>
        <div className="modal-inputs">
          <div className="modal-input-container">
            <label className="modal-input-label" htmlFor="rounds">
              Rounds:
            </label>
            <input className="modal-input" type="number" id="rounds" />
          </div>

          <div className="modal-input-container">
            <label
              className="modal-input-label"
              htmlFor="time-per-round-minutes"
            >
              Time per Round (MM:SS):
            </label>
            <div className="time-input-group">
              <input
                className="modal-input"
                type="number"
                id="time-per-round-minutes"
                placeholder="00"
                min="0"
                max="59"
              />
              <span className="modal-input-colon">:</span>
              <input
                className="modal-input"
                type="number"
                id="time-per-round-seconds"
                placeholder="00"
                min="0"
                max="59"
              />
            </div>
          </div>

          <div className="modal-input-container">
            <label className="modal-input-label" htmlFor="break-time">
              Break Time (MM:SS):
            </label>
            <div className="time-input-group">
              <input
                className="modal-input"
                type="number"
                id="break-time-minutes"
                placeholder="00"
                min="0"
                max="59"
              />
              <span className="modal-input-colon">:</span>
              <input
                className="modal-input"
                type="number"
                id="break-time-seconds"
                placeholder="00"
                min="0"
                max="59"
              />
            </div>
          </div>
        </div>
        <div className="modal-button-container">
          <button className="modal-button" type="submit">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
