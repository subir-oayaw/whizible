// AuthProvider.js

import React, { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import fetchUserProfile from "../hooks/fetchUserProfile";
import LoadingPage from "../views/LoadingPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { initializeIcons } from "@fluentui/react/lib/Icons";

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
  handleMicrosoftSignIn: () => {} // Ensure all context methods are defined initially
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showLoader, setShowLoader] = useState(true);

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
    const accessToken =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktRMnRBY3JFN2xCYVZWR0JtYzVGb2JnZEpvNCIsImtpZCI6IktRMnRBY3JFN2xCYVZWR0JtYzVGb2JnZEpvNCJ9.eyJhdWQiOiJhcGk6Ly8zNjg2NDQ5My1lYTFjLTQ0OGEtYTQ2Yi1mZGFmN2YyMmZiOWYiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9kZTc3ZWU0My04Y2ViLTQ4OWMtOWU4YS0wMjRmMmM0ZTFhNjIvIiwiaWF0IjoxNzIyODQ5MTU2LCJuYmYiOjE3MjI4NDkxNTYsImV4cCI6MTcyMjg1MzM3NiwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhYQUFBQUVRWTIxdVhic215ZEJXTERZK0taRXFaMk9VYTdXclRJNE1SeVVCLzVEOFVLTnF6TS9iKzljY0E0MXdhRDF6K3ciLCJhbXIiOlsicHdkIl0sImFwcGlkIjoiMzY4NjQ0OTMtZWExYy00NDhhLWE0NmItZmRhZjdmMjJmYjlmIiwiYXBwaWRhY3IiOiIxIiwiaXBhZGRyIjoiMTAzLjE5OS4yMDIuNjEiLCJuYW1lIjoiV2hpemlibGVfVGVzdCIsIm9pZCI6IjhjYmRkOTYzLWY4NGUtNDhlMy1iYmY5LTYyMDBlMTA2YWMwOSIsInJoIjoiMC5BVlVBUS01MzN1dU1uRWllaWdKUExFNGFZcE5FaGpZYzZvcEVwR3Y5cjM4aS01LV9BRG8uIiwic2NwIjoiYWNjZXNzX2FzX3VzZXIiLCJzdWIiOiJEOFFwU2IyV0F0ZnJDRlVZaDktMi1mVm9UR3dnZEdLa3YzdTNTRjcwUFNBIiwidGlkIjoiZGU3N2VlNDMtOGNlYi00ODljLTllOGEtMDI0ZjJjNGUxYTYyIiwidW5pcXVlX25hbWUiOiJXaGl6aWJsZV9UZXN0QHdoaXppYmxlLm5ldCIsInVwbiI6IldoaXppYmxlX1Rlc3RAd2hpemlibGUubmV0IiwidXRpIjoiY1ZxS3E3WUwtVXVGclBDRmNpLXRBQSIsInZlciI6IjEuMCJ9.J02Zb2c3Yg_sKCk4H98lQ-5FVe7BhIjxAGlLZpWUs-JtzFN_sgl6UIe0aNyYiNjSjRMoUVwZ7RIXpvWhM92wszcSWc-7TvOeGTOf4xeS0nHUhRwmub9qVt7eC9zSybEXzuxGVhfSwJ0FJw6ZlKjb5LA71cpbbk4ErMXxSVFYcF8H2h2BaaX4b_Am2Vr1zoV6l6Fz0ncPVzFTjQWXjHwzZXmkbgc8CQYeEJ9oNYK467d08B5VJlZKzXeXLB9EArnYsQg4KnvKLhWrzt16Wkgx_P8mwjoxno_exioLHvPHgDpU21sSMTN__TmjLM_Y_9_F5nyWWYPgHWY6qe8vCXYkkg"
    sessionStorage.setItem("access_token", accessToken);
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
    (async () => {
      try {
        // const url = window.location.href;
        // const codeMatch = url.match(/[?&]code=([^&]+)/);
        // const stateMatch = url.match(/[?&]state=([^&]+)/);
        // const code = codeMatch ? codeMatch[1] : null;
        // const state = stateMatch ? stateMatch[1] : null;

        // if (code && state) {
        //   const redirectUri = process.env.REACT_APP_REDIRECT_URI;
        //   const baseurlAccessControl = process.env.REACT_APP_BASEURL_ACCESS_CONTROL;

        //   const response = await axios.get(
        //     `${baseurlAccessControl}/api/Authentication/GetToken?code=${code}&state=${state}&redirectUri=${encodeURIComponent(
        //       redirectUri
        //     )}`
        //   );

        // const { accessToken } = response.data;
        const accessToken =
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyIsImtpZCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyJ9.eyJhdWQiOiJhcGk6Ly8zNjg2NDQ5My1lYTFjLTQ0OGEtYTQ2Yi1mZGFmN2YyMmZiOWYiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9kZTc3ZWU0My04Y2ViLTQ4OWMtOWU4YS0wMjRmMmM0ZTFhNjIvIiwiaWF0IjoxNzIyODQ4OTA3LCJuYmYiOjE3MjI4NDg5MDcsImV4cCI6MTcyMjg1MzMyOSwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhYQUFBQXZNem9jaGk5VXNXTzVJSExVNGFGR1JqRkFXZmkwUGkyMFBsZkYvNkFhMGtJSG5rTXpCWVdMREE4TGJobFZyaHoiLCJhbXIiOlsicHdkIl0sImFwcGlkIjoiMzY4NjQ0OTMtZWExYy00NDhhLWE0NmItZmRhZjdmMjJmYjlmIiwiYXBwaWRhY3IiOiIxIiwiaXBhZGRyIjoiMTAzLjE5OS4yMDIuNjEiLCJuYW1lIjoiV2hpemlibGVfVGVzdCIsIm9pZCI6IjhjYmRkOTYzLWY4NGUtNDhlMy1iYmY5LTYyMDBlMTA2YWMwOSIsInJoIjoiMC5BVlVBUS01MzN1dU1uRWllaWdKUExFNGFZcE5FaGpZYzZvcEVwR3Y5cjM4aS01LV9BRG8uIiwic2NwIjoiYWNjZXNzX2FzX3VzZXIiLCJzdWIiOiJEOFFwU2IyV0F0ZnJDRlVZaDktMi1mVm9UR3dnZEdLa3YzdTNTRjcwUFNBIiwidGlkIjoiZGU3N2VlNDMtOGNlYi00ODljLTllOGEtMDI0ZjJjNGUxYTYyIiwidW5pcXVlX25hbWUiOiJXaGl6aWJsZV9UZXN0QHdoaXppYmxlLm5ldCIsInVwbiI6IldoaXppYmxlX1Rlc3RAd2hpemlibGUubmV0IiwidXRpIjoiXzNqUE9ockhfRXVDMDIxUG5RS3pBQSIsInZlciI6IjEuMCJ9.P6vhuBl9cWCR8OLQi5HqYwogskIAgjE3oYtefhHaHAVm1V037cN3ijHfrYCaaRZQOjM-obn6g_HC-bRDmQ0L-1dEe-dct90scjRT39q-RazY4kXOibkMskUvG6x-VtQnmbEzr53rjC0E9hccBS0DbyL3cjDJfUGpACQIKg_wRYV2wjMUeNeZoM_ZiZ8yb8YDxnw1T9yocU3lxUXU4hymdj1tPe4Cs7pbrd2GOi3vowQLxeane1Oz5vENTb2mqEVKQ_pT4Dd3ZntyjS-mIHFUj2GEfpVi2Xh2lzJNkAsP-_ZXjQaccro2s-sAW-Qjtk-zH_6U-s5qgTVjJmITzN690A.eyJhdWQiOiJhcGk6Ly8zNjg2NDQ5My1lYTFjLTQ0OGEtYTQ2Yi1mZGFmN2YyMmZiOWYiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9kZTc3ZWU0My04Y2ViLTQ4OWMtOWU4YS0wMjRmMmM0ZTFhNjIvIiwiaWF0IjoxNzIyODM5MjM1LCJuYmYiOjE3MjI4MzkyMzUsImV4cCI6MTcyMjg0Mzk4MywiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhYQUFBQXZ2Mm02VUpKVjkrKzNtL015bERQR2V2aFZucFpkM1JRdG5HQnh4bWpzLzAyR2xuQTkrYjErRmxHN3ZuMHRFbFciLCJhbXIiOlsicHdkIl0sImFwcGlkIjoiMzY4NjQ0OTMtZWExYy00NDhhLWE0NmItZmRhZjdmMjJmYjlmIiwiYXBwaWRhY3IiOiIxIiwiaXBhZGRyIjoiMTAzLjE5OS4yMDIuNjEiLCJuYW1lIjoiV2hpemlibGVfVGVzdCIsIm9pZCI6IjhjYmRkOTYzLWY4NGUtNDhlMy1iYmY5LTYyMDBlMTA2YWMwOSIsInJoIjoiMC5BVlVBUS01MzN1dU1uRWllaWdKUExFNGFZcE5FaGpZYzZvcEVwR3Y5cjM4aS01LV9BRG8uIiwic2NwIjoiYWNjZXNzX2FzX3VzZXIiLCJzdWIiOiJEOFFwU2IyV0F0ZnJDRlVZaDktMi1mVm9UR3dnZEdLa3YzdTNTRjcwUFNBIiwidGlkIjoiZGU3N2VlNDMtOGNlYi00ODljLTllOGEtMDI0ZjJjNGUxYTYyIiwidW5pcXVlX25hbWUiOiJXaGl6aWJsZV9UZXN0QHdoaXppYmxlLm5ldCIsInVwbiI6IldoaXppYmxlX1Rlc3RAd2hpemlibGUubmV0IiwidXRpIjoiRGVhRnNmaUNiVXlka2dXNk43TXpBQSIsInZlciI6IjEuMCJ9.WnwzQB5GIi6G-eQvUHZPqHIHdC69Lep-XdguAUEUc6yZ8ERLj8NwFaLwx6kHS3Q4ftZDekRXUhjRb-cAm-mxPpRidrmsctxlqyZfuTcY4t8_zWRJrAwLYYB8qTH2XWFlOXtANzx9C1flmmoqSsf6U2vZDWF-AHyc2h1apbJv87LJlWE-45uwy_kw0ia2Jj_X6YTAmVl5-uELkVxhskXaqqEUDpXjA1F0QyU3PzZ6xNFqLHi-xTkaTGQtHgpGmp8ujmw4t5jIv-8Ri0Rb1i8DgtvQ9Kt2aD5R-6enCFwv5mzfLDozEB0WalUyNeDLEG3Bat39LFngOYq7VutWTW5RMw";

        if (accessToken) {
          sessionStorage.setItem("access_token", accessToken);

          const user = await fetchUserProfile(accessToken);
          sessionStorage.setItem("user", JSON.stringify(user));

          dispatch({ type: "LOGIN", payload: { isAuthenticated: true, user } });

          toast.success("Login successful");
        } else {
          dispatch({ type: "INIT", payload: { isAuthenticated: false, user: null } });
          toast.error("Login failed. Please retry.");
        }
      } catch (err) {
        console.error("Initialization failed", err);
        dispatch({ type: "INIT", payload: { isAuthenticated: false, user: null } });
        toast.error("Login failed. Please retry.");
      } finally {
        setShowLoader(false);
      }
    })();
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
