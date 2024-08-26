import React, { useState, useEffect, useReducer } from "react";
import { initializeIcons } from "@fluentui/react";
import loginFrameImage from "../../assets/Images/Loginframe.png";
import developerImage from "../../assets/Images/developerrr.png";
import axios from "axios";
import fetchUserProfile from "../hooks/fetchUserProfile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const initialState = {
  user: null,
  isInitialized: false,
  isAuthenticated: false
};

initializeIcons();

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      const { isAuthenticated, user } = action.payload;
      return { ...state, isAuthenticated, isInitialized: true, user };
    }
    case "LOGIN": {
      return { ...state, isAuthenticated: true, user: action.payload.user };
    }
    case "LOGOUT": {
      return { ...state, isAuthenticated: false, user: null };
    }
    case "REGISTER": {
      const { user } = action.payload;
      return { ...state, isAuthenticated: true, user };
    }
    default:
      return state;
  }
};

const LoadingPage = () => {
  const taglines = [
    "Secure transactions",
    "24/7 banking services",
    "Global access",
    "Personalized solutions",
    "Efficient money management"
  ];

  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [dots, setDots] = useState(".");

  const images = [loginFrameImage, developerImage];

  useEffect(() => {
    const initialize = async () => {
      try {
        const url = window.location.href;
        const codeMatch = url.match(/[?&]code=([^&]+)/);
        const stateMatch = url.match(/[?&]state=([^&]+)/);
        const code = codeMatch ? codeMatch[1] : null;
        const state = stateMatch ? stateMatch[1] : null;

        if (code && state) {
          const redirectUri = process.env.REACT_APP_REDIRECT_URI;
          const baseurlAccessControl = process.env.REACT_APP_BASEURL_ACCESS_CONTROL;

          const response = await axios.get(
            `${baseurlAccessControl}/api/Authentication/GetToken?code=${code}&state=${state}&redirectUri=${encodeURIComponent(
              redirectUri
            )}`
          );

          const { accessToken } = response.data;

          if (accessToken) {
            sessionStorage.setItem("access_token", accessToken);

            const user = await fetchUserProfile(accessToken);
            sessionStorage.setItem("user", JSON.stringify(user));

            dispatch({ type: "LOGIN", payload: { isAuthenticated: true, user } });

            toast.success("Login successful");
            navigate("/landingPage");
          } else {
            dispatch({ type: "INIT", payload: { isAuthenticated: false, user: null } });
            toast.error("Login failed. Please retry.");
          }
        } else {
          dispatch({ type: "INIT", payload: { isAuthenticated: false, user: null } });
          if (!sessionStorage.setItem("user")) toast.error("Login failed. Please retry.");
        }
      } catch (err) {
        console.error("Initialization failed", err);
        dispatch({ type: "INIT", payload: { isAuthenticated: false, user: null } });
      }
    };

    initialize();
  }, [navigate]); // Adding navigate to the dependency array ensures that the effect runs if navigate changes

  useEffect(() => {
    const taglineInterval = setInterval(() => {
      setTaglineIndex((prevIndex) => (prevIndex + 1) % taglines.length);
    }, 3000);

    const imageInterval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

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
    }, 5000);

    return () => {
      clearInterval(taglineInterval);
      clearInterval(imageInterval);
      clearInterval(dotsInterval);
    };
  }, [taglines.length, images.length]);

  // Render the loading page only if initialization is not complete
  if (!state.isInitialized) {
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
        <div style={{ marginBottom: "1rem" }}>
          <span>We're fetching the latest data for you{dots}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
          <img src={images[imageIndex]} alt="Loading" style={{ width: 150, height: 150 }} />
        </div>
        <div style={{ textAlign: "center", fontSize: "1.5rem" }}>{taglines[taglineIndex]}</div>
      </div>
    );
  }

  return null; // or you can redirect to a different component if needed
};

export default LoadingPage;
