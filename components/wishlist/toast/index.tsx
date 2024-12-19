import React from "react";

type ToastProps = {
  message: string;
  isVisible: boolean;
};

const Toast = ({ message, isVisible }: ToastProps) => {
  return (
    <div
      className={`toast ${isVisible ? "toast-show" : ""}`}
      style={{
        position: "fixed",
        top: "20px",  // Adjusted positioning for better visibility
        right: "20px",  // Position on the right side
        padding: "12px 24px",
        backgroundColor: "var(--color-orange)",  // Matching with app's design color
        color: "#fff",  // White text for contrast
        borderRadius: "8px",  // Rounded corners similar to app elements
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
        zIndex: 1000,
        fontSize: "14px",  // Font size consistent with app design
        fontWeight: "600",  // Font weight for emphasis
      }}
    >
      {message}
    </div>
  );
};

export default Toast;
