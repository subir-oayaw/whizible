import React, { createContext, useEffect, useReducer, useState } from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import axios from "axios";
import fetchUserProfile from "../hooks/fetchUserProfile";
import LoadingPage from "../views/LoadingPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import { useNavigate } from "react-router-dom";

initializeIcons();

// MSAL configuration
const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_MSAL_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}`,
    redirectUri: process.env.REACT_APP_REDIRECT_URI
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false
  }
};

const msalInstance = new PublicClientApplication(msalConfig);

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
  handleMicrosoftSignIn: () => {} // Ensure all context methods are defined initially
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showLoader, setShowLoader] = useState(true);
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

  // Microsoft login using popup
  const handleMicrosoftSignIn = async () => {
    try {
      const loginResponse = await msalInstance.loginPopup({
        scopes: ["user.read"],
        prompt: "select_account"
      });

      const accessToken = loginResponse.accessToken;
      sessionStorage.setItem("access_token", accessToken);

      const user = await fetchUserProfile(accessToken);
      sessionStorage.setItem("user", JSON.stringify(user));

      dispatch({ type: "LOGIN", payload: { user } });
      toast.success("Microsoft Login successful");
      navigate("/landingPage");
    } catch (error) {
      console.error("Microsoft login failed", error);
      toast.error("Microsoft login failed. Please retry.");
    }
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

  if (showLoader) return <LoadingPage />;

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "JWT",
        login,
        logout,
        register,
        handleMicrosoftSignIn // Ensure handleMicrosoftSignIn is included in the context value
      }}
    >
      <ToastContainer position="top-right" autoClose={5000} />
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
