export const SettingsModal = () => {
  return (
    <div id="modal" className="modal">
      <div className="modal-content">
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
        <div className="modal-input-container">
          <label className="modal-input-label" htmlFor="rounds">
            Rounds:
          </label>
          <input className="modal-input" type="number" id="rounds" />
          <br />
          <label className="modal-input-label" htmlFor="time-per-round">
            Time per Round (seconds):
          </label>
          <input className="modal-input" type="number" id="time-per-round" />
          <br />
          <label className="modal-input-label" htmlFor="break-time">
            Break Time (seconds):
          </label>
          <input className="modal-input" type="number" id="break-time" />
          <br />
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
