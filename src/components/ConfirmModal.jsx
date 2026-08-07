import { createPortal } from "react-dom";
import { useEffect } from "react";

function ConfirmModal({
  title = "Are you sure?",
  message,
  onConfirm,
  onCancel,
}) {

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCancel]);

  // Prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return createPortal(
  <div className="modal-overlay">
    <div
      className="confirm-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      aria-describedby="confirm-message"
    >
      <h3 id="confirm-title">{title}</h3>

      <p id="confirm-message">{message}</p>

      <div className="modal-actions">
        <button
          className="cancel-button"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          className="modal-delete-btn"
          onClick={onConfirm}
        >
          Delete
        </button>
      </div>
    </div>
  </div>,
  document.body
);
}

export default ConfirmModal;