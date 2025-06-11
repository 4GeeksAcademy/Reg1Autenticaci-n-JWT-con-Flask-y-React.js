import React from "react";

export const Footer = () => {
  return (
    <footer
      className="text-center py-3"
      style={{
        backgroundColor: "#F5EBFF",
        color: "#6B21A8",
        fontWeight: "500",
        fontSize: "1rem",
        boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.05)"
      }}
    >
      Made with{" "}
      <span
        style={{
          color: "#FF00FF",
          textShadow: "0 0 8px #FF00FF",
          fontSize: "1.2rem",
        }}
      >
        ❤️
      </span>{" "}
      by <span style={{ color: "#4C1D95", fontWeight: "600" }}>Jackie</span>
    </footer>
  );
};
