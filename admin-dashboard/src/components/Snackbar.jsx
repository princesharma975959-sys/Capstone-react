import { useEffect } from "react";

export default function Snackbar({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        background: type === "error" ? "#dc2626" : "#16a34a",
        color: "#fff",
        padding: "12px 20px",
        borderRadius: "8px",
        zIndex: 99999,
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        fontSize: "14px",
      }}
    >
      {message}
    </div>
  );
}