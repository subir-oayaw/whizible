// LoadingPage.js

import React, { useState, useEffect } from "react";
import { initializeIcons } from "@fluentui/react"; // Fluent UI imports
import loginFrameImage from "../../assets/Images/Loginframe.png";
import developerImage from "../../assets/Images/developerrr.png";

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

  // Example images related to banking
  const images = [loginFrameImage, developerImage];

  const [taglineIndex, setTaglineIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const taglineInterval = setInterval(() => {
      setTaglineIndex((prevIndex) => (prevIndex + 1) % taglines.length);
    }, 3000); // Change tagline every 3 seconds

    const imageInterval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

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
      clearInterval(imageInterval);
      clearInterval(dotsInterval);
    };
  }, [taglines.length, images.length]);

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
        <span>We're fetching the latest data for you{dots}</span>
      </div>

      {/* Rotate images */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
        <img src={images[imageIndex]} alt="Loading" style={{ width: 150, height: 150 }} />
      </div>

      {/* Rotate taglines */}
      <div style={{ textAlign: "center", fontSize: "1.5rem" }}>{taglines[taglineIndex]}</div>
    </div>
  );
};

export default LoadingPage;
