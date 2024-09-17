import React, { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import fetchUserProfile from "../hooks/fetchUserProfile";
import LoadingPage from "../views/LoadingPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import { useNavigate } from "react-router-dom";

// Initialize Fluent UI icons (required step)
initializeIcons();

const initialState = {
  user: null,
  isInitialized: false,
  isAuthenticated: false
};

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

const AuthContext = createContext({
  ...initialState,
  method: "JWT",
  login: () => {},
  logout: () => {},
  register: () => {},
  handleMicrosoftSignIn: () => {}
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showLoader, setShowLoader] = useState(true);
  const [authWindow, setAuthWindow] = useState(null); // State to store the popup reference
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const { user } = response.data;

      dispatch({ type: "LOGIN", payload: { user } });
      sessionStorage.setItem("access_token", response.data.token);

      toast.success("Login successful");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please retry.");
    }
  };

  const register = async (email, username, password) => {
    try {
      const response = await axios.post("/api/auth/register", { email, username, password });
      const { user } = response.data;

      dispatch({ type: "REGISTER", payload: { user } });
      sessionStorage.setItem("access_token", response.data.token);

      toast.success("Registration successful");
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please retry.");
    }
  };

  const logout = () => {
    sessionStorage.removeItem("access_token");
    dispatch({ type: "LOGOUT" });
    toast.success("Logout successful");
  };

  const handleMicrosoftSignIn = () => {
    const baseurlAccessControl = process.env.REACT_APP_BASEURL_ACCESS_CONTROL;
    const redirectUri = process.env.REACT_APP_REDIRECT_URI;

    const width = 600;
    const height = 700;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const newAuthWindow = window.open(
      `${baseurlAccessControl}/api/Authentication/login?redirectUri=${encodeURIComponent(
        redirectUri
      )}`,
      "Microsoft Sign-In",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    setAuthWindow(newAuthWindow); // Store the reference

    const messageListener = (event) => {
      if (event.origin === baseurlAccessControl && event.data) {
        const { accessToken, user } = event.data;

        if (accessToken && user) {
          sessionStorage.setItem("access_token", accessToken);
          sessionStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("access_token", accessToken);
          dispatch({ type: "LOGIN", payload: { user } });

          toast.success("Login successful");

          // Close the popup if it's still open
          if (authWindow && !authWindow.closed) {
            authWindow.close();
          }

          // Redirect the main window
          navigate("/landingPage");
        } else {
          toast.error("Login failed. Please retry.");
        }
      }
    };

    window.addEventListener("message", messageListener);

    return () => {
      window.removeEventListener("message", messageListener);
    };
  };

  useEffect(() => {
    const initialize = async () => {
      const token = sessionStorage.getItem("access_token");
      const user = sessionStorage.getItem("user");

      if (user) {
        dispatch({ type: "INIT", payload: { isAuthenticated: true, user: JSON.parse(user) } });
        setShowLoader(false);
      } else if (token) {
        dispatch({ type: "INIT", payload: { isAuthenticated: true, user: null } });
        setShowLoader(false);
      } else {
        dispatch({ type: "INIT", payload: { isAuthenticated: false, user: null } });
        setShowLoader(false);
      }
    };

    initialize();
  }, []);

  useEffect(() => {
    const handleAuthCode = async () => {
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
            console.log("Access Token from Popup:", accessToken);

            // Save the token to localStorage
            localStorage.setItem("access_token", accessToken);

            // Notify the main window
            if (window.opener) {
              window.opener.postMessage({ action: "tokenReceived" }, "*");
            }

            // Close the popup
            window.close();
          } else {
            console.error("No access token received");
            toast.error("Login failed. Please retry.");
          }
        }
      } catch (err) {
        console.error("Initialization failed", err);
        toast.error("Login failed. Please retry.");
      } finally {
        setShowLoader(false);
      }
    };

    handleAuthCode();
  }, [navigate]);

  if (showLoader) return <LoadingPage />;

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "JWT",
        login,
        logout,
        register,
        handleMicrosoftSignIn
      }}
    >
      <ToastContainer position="top-right" autoClose={5000} />
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
