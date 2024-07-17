// LoadingPage.js

import React, { useState, useEffect } from "react";
import { initializeIcons, Icon } from "@fluentui/react"; // Fluent UI imports

// Initialize Fluent UI icons (required step)
initializeIcons();

const LoadingPage = () => {
  // Example taglines related to banking
  const taglines = [
    "Secure transactions",
    "24/7 banking services",
    "Global access",
    "Personalized solutions",
    "Efficient money management"
  ];

  // Example icons related to banking from Fluent UI
  const icons = ["Bank", "Money", "PaymentCard", "Savings", "CreditCardSolid"];

  const [taglineIndex, setTaglineIndex] = useState(0);
  const [iconIndex, setIconIndex] = useState(0);
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const taglineInterval = setInterval(() => {
      setTaglineIndex((prevIndex) => (prevIndex + 1) % taglines.length);
    }, 3000); // Change tagline every 3 seconds

    const iconInterval = setInterval(() => {
      setIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
    }, 3000); // Change icon every 3 seconds

    const dotsInterval = setInterval(() => {
      setDots((prevDots) => {
        switch (prevDots) {
          case ".":
            return "..";
          case "..":
            return "...";
          case "...":
            return ".";
          default:
            return ".";
        }
      });
    }, 1000); // Change dots every second

    return () => {
      clearInterval(taglineInterval);
      clearInterval(iconInterval);
      clearInterval(dotsInterval);
    };
  }, [taglines.length, icons.length]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "1.2rem"
      }}
    >
      {/* Loading message with animated dots */}
      <div style={{ marginBottom: "1rem" }}>
        <span>We're fetching latest data for you{dots}</span>
      </div>

      {/* Rotate icons */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
        <Icon iconName={icons[iconIndex]} style={{ fontSize: 72 }} />
      </div>

      {/* Rotate taglines */}
      <div style={{ textAlign: "center", fontSize: "1.5rem" }}>{taglines[taglineIndex]}</div>
    </div>
  );
};

export default LoadingPage;
