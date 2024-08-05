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
    // const baseurlAccessControl = process.env.REACT_APP_BASEURL_ACCESS_CONTROL;
    // const redirectUri = process.env.REACT_APP_REDIRECT_URI;

    // window.location.href =
    //   baseurlAccessControl +
    //   `/api/Authentication/login?redirectUri=${encodeURIComponent(redirectUri)}`;
    sessionStorage.setItem(
      "access_token",
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyIsImtpZCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyJ9.eyJhdWQiOiJhcGk6Ly8zNjg2NDQ5My1lYTFjLTQ0OGEtYTQ2Yi1mZGFmN2YyMmZiOWYiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9kZTc3ZWU0My04Y2ViLTQ4OWMtOWU4YS0wMjRmMmM0ZTFhNjIvIiwiaWF0IjoxNzIyODQ4MDYyLCJuYmYiOjE3MjI4NDgwNjIsImV4cCI6MTcyMjg1MzA5NywiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhYQUFBQU9vR25SY01panNISys1ZG1hYkU1WTlUd1VUUXY4d3E4ZlZMWXBiUW45ZHcrUzlHSmx1M2d5V2JaNDI2RFVWMlciLCJhbXIiOlsicHdkIl0sImFwcGlkIjoiMzY4NjQ0OTMtZWExYy00NDhhLWE0NmItZmRhZjdmMjJmYjlmIiwiYXBwaWRhY3IiOiIxIiwiaXBhZGRyIjoiMTAzLjE5OS4yMDIuNjEiLCJuYW1lIjoiV2hpemlibGVfVGVzdCIsIm9pZCI6IjhjYmRkOTYzLWY4NGUtNDhlMy1iYmY5LTYyMDBlMTA2YWMwOSIsInJoIjoiMC5BVlVBUS01MzN1dU1uRWllaWdKUExFNGFZcE5FaGpZYzZvcEVwR3Y5cjM4aS01LV9BRG8uIiwic2NwIjoiYWNjZXNzX2FzX3VzZXIiLCJzdWIiOiJEOFFwU2IyV0F0ZnJDRlVZaDktMi1mVm9UR3dnZEdLa3YzdTNTRjcwUFNBIiwidGlkIjoiZGU3N2VlNDMtOGNlYi00ODljLTllOGEtMDI0ZjJjNGUxYTYyIiwidW5pcXVlX25hbWUiOiJXaGl6aWJsZV9UZXN0QHdoaXppYmxlLm5ldCIsInVwbiI6IldoaXppYmxlX1Rlc3RAd2hpemlibGUubmV0IiwidXRpIjoiM1NPeldyVl9vMGk4TTZWeXFVSFNBQSIsInZlciI6IjEuMCJ9.mRpcs70GUSX52EOIz7KjZjBTRzx4zhKTx59Hu-M23khwqyBwt99jbdvRyeY0hP7CAvIBg9nczApdKmzgMBXJ6h0fhMvizvoQ9maNuVbgi0znK5dc_Q4wGnKtxEhgZWHcxZERn7JR2VupSnzoNq1Flas3yZSMJN263cnDFNJJ75z9Ht1r4XLQCE0yPpZAugnSNAcUwKWzv38ow3ccZLwoXL9jimC-EW_yetC-wjrsa69ClJwDYCjHccnhz1prmPy9vZU7nCZf-rgCAagT2KJsHSPWvGxPsw6ymYTXGI7JADkY9rR3RzTSacodGRFngnPLORAbPjSX2kqjGGvYPTnFTQ.eyJhdWQiOiJhcGk6Ly8zNjg2NDQ5My1lYTFjLTQ0OGEtYTQ2Yi1mZGFmN2YyMmZiOWYiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9kZTc3ZWU0My04Y2ViLTQ4OWMtOWU4YS0wMjRmMmM0ZTFhNjIvIiwiaWF0IjoxNzIyODM5MjM1LCJuYmYiOjE3MjI4MzkyMzUsImV4cCI6MTcyMjg0Mzk4MywiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhYQUFBQXZ2Mm02VUpKVjkrKzNtL015bERQR2V2aFZucFpkM1JRdG5HQnh4bWpzLzAyR2xuQTkrYjErRmxHN3ZuMHRFbFciLCJhbXIiOlsicHdkIl0sImFwcGlkIjoiMzY4NjQ0OTMtZWExYy00NDhhLWE0NmItZmRhZjdmMjJmYjlmIiwiYXBwaWRhY3IiOiIxIiwiaXBhZGRyIjoiMTAzLjE5OS4yMDIuNjEiLCJuYW1lIjoiV2hpemlibGVfVGVzdCIsIm9pZCI6IjhjYmRkOTYzLWY4NGUtNDhlMy1iYmY5LTYyMDBlMTA2YWMwOSIsInJoIjoiMC5BVlVBUS01MzN1dU1uRWllaWdKUExFNGFZcE5FaGpZYzZvcEVwR3Y5cjM4aS01LV9BRG8uIiwic2NwIjoiYWNjZXNzX2FzX3VzZXIiLCJzdWIiOiJEOFFwU2IyV0F0ZnJDRlVZaDktMi1mVm9UR3dnZEdLa3YzdTNTRjcwUFNBIiwidGlkIjoiZGU3N2VlNDMtOGNlYi00ODljLTllOGEtMDI0ZjJjNGUxYTYyIiwidW5pcXVlX25hbWUiOiJXaGl6aWJsZV9UZXN0QHdoaXppYmxlLm5ldCIsInVwbiI6IldoaXppYmxlX1Rlc3RAd2hpemlibGUubmV0IiwidXRpIjoiRGVhRnNmaUNiVXlka2dXNk43TXpBQSIsInZlciI6IjEuMCJ9.WnwzQB5GIi6G-eQvUHZPqHIHdC69Lep-XdguAUEUc6yZ8ERLj8NwFaLwx6kHS3Q4ftZDekRXUhjRb-cAm-mxPpRidrmsctxlqyZfuTcY4t8_zWRJrAwLYYB8qTH2XWFlOXtANzx9C1flmmoqSsf6U2vZDWF-AHyc2h1apbJv87LJlWE-45uwy_kw0ia2Jj_X6YTAmVl5-uELkVxhskXaqqEUDpXjA1F0QyU3PzZ6xNFqLHi-xTkaTGQtHgpGmp8ujmw4t5jIv-8Ri0Rb1i8DgtvQ9Kt2aD5R-6enCFwv5mzfLDozEB0WalUyNeDLEG3Bat39LFngOYq7VutWTW5RMw"
    );
    window.location.reload();
  };

  useEffect(() => {
    const initialize = async () => {
      const token = sessionStorage.getItem("access_token");
      if (token) {
        dispatch({ type: "INIT", payload: { isAuthenticated: true, user: null } });
      } else {
        dispatch({ type: "INIT", payload: { isAuthenticated: false, user: null } });
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
        accessToken =
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyIsImtpZCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyJ9.eyJhdWQiOiJhcGk6Ly8zNjg2NDQ5My1lYTFjLTQ0OGEtYTQ2Yi1mZGFmN2YyMmZiOWYiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9kZTc3ZWU0My04Y2ViLTQ4OWMtOWU4YS0wMjRmMmM0ZTFhNjIvIiwiaWF0IjoxNzIyODQ4MDYyLCJuYmYiOjE3MjI4NDgwNjIsImV4cCI6MTcyMjg1MzA5NywiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhYQUFBQU9vR25SY01panNISys1ZG1hYkU1WTlUd1VUUXY4d3E4ZlZMWXBiUW45ZHcrUzlHSmx1M2d5V2JaNDI2RFVWMlciLCJhbXIiOlsicHdkIl0sImFwcGlkIjoiMzY4NjQ0OTMtZWExYy00NDhhLWE0NmItZmRhZjdmMjJmYjlmIiwiYXBwaWRhY3IiOiIxIiwiaXBhZGRyIjoiMTAzLjE5OS4yMDIuNjEiLCJuYW1lIjoiV2hpemlibGVfVGVzdCIsIm9pZCI6IjhjYmRkOTYzLWY4NGUtNDhlMy1iYmY5LTYyMDBlMTA2YWMwOSIsInJoIjoiMC5BVlVBUS01MzN1dU1uRWllaWdKUExFNGFZcE5FaGpZYzZvcEVwR3Y5cjM4aS01LV9BRG8uIiwic2NwIjoiYWNjZXNzX2FzX3VzZXIiLCJzdWIiOiJEOFFwU2IyV0F0ZnJDRlVZaDktMi1mVm9UR3dnZEdLa3YzdTNTRjcwUFNBIiwidGlkIjoiZGU3N2VlNDMtOGNlYi00ODljLTllOGEtMDI0ZjJjNGUxYTYyIiwidW5pcXVlX25hbWUiOiJXaGl6aWJsZV9UZXN0QHdoaXppYmxlLm5ldCIsInVwbiI6IldoaXppYmxlX1Rlc3RAd2hpemlibGUubmV0IiwidXRpIjoiM1NPeldyVl9vMGk4TTZWeXFVSFNBQSIsInZlciI6IjEuMCJ9.mRpcs70GUSX52EOIz7KjZjBTRzx4zhKTx59Hu-M23khwqyBwt99jbdvRyeY0hP7CAvIBg9nczApdKmzgMBXJ6h0fhMvizvoQ9maNuVbgi0znK5dc_Q4wGnKtxEhgZWHcxZERn7JR2VupSnzoNq1Flas3yZSMJN263cnDFNJJ75z9Ht1r4XLQCE0yPpZAugnSNAcUwKWzv38ow3ccZLwoXL9jimC-EW_yetC-wjrsa69ClJwDYCjHccnhz1prmPy9vZU7nCZf-rgCAagT2KJsHSPWvGxPsw6ymYTXGI7JADkY9rR3RzTSacodGRFngnPLORAbPjSX2kqjGGvYPTnFTQ.eyJhdWQiOiJhcGk6Ly8zNjg2NDQ5My1lYTFjLTQ0OGEtYTQ2Yi1mZGFmN2YyMmZiOWYiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9kZTc3ZWU0My04Y2ViLTQ4OWMtOWU4YS0wMjRmMmM0ZTFhNjIvIiwiaWF0IjoxNzIyODM5MjM1LCJuYmYiOjE3MjI4MzkyMzUsImV4cCI6MTcyMjg0Mzk4MywiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhYQUFBQXZ2Mm02VUpKVjkrKzNtL015bERQR2V2aFZucFpkM1JRdG5HQnh4bWpzLzAyR2xuQTkrYjErRmxHN3ZuMHRFbFciLCJhbXIiOlsicHdkIl0sImFwcGlkIjoiMzY4NjQ0OTMtZWExYy00NDhhLWE0NmItZmRhZjdmMjJmYjlmIiwiYXBwaWRhY3IiOiIxIiwiaXBhZGRyIjoiMTAzLjE5OS4yMDIuNjEiLCJuYW1lIjoiV2hpemlibGVfVGVzdCIsIm9pZCI6IjhjYmRkOTYzLWY4NGUtNDhlMy1iYmY5LTYyMDBlMTA2YWMwOSIsInJoIjoiMC5BVlVBUS01MzN1dU1uRWllaWdKUExFNGFZcE5FaGpZYzZvcEVwR3Y5cjM4aS01LV9BRG8uIiwic2NwIjoiYWNjZXNzX2FzX3VzZXIiLCJzdWIiOiJEOFFwU2IyV0F0ZnJDRlVZaDktMi1mVm9UR3dnZEdLa3YzdTNTRjcwUFNBIiwidGlkIjoiZGU3N2VlNDMtOGNlYi00ODljLTllOGEtMDI0ZjJjNGUxYTYyIiwidW5pcXVlX25hbWUiOiJXaGl6aWJsZV9UZXN0QHdoaXppYmxlLm5ldCIsInVwbiI6IldoaXppYmxlX1Rlc3RAd2hpemlibGUubmV0IiwidXRpIjoiRGVhRnNmaUNiVXlka2dXNk43TXpBQSIsInZlciI6IjEuMCJ9.WnwzQB5GIi6G-eQvUHZPqHIHdC69Lep-XdguAUEUc6yZ8ERLj8NwFaLwx6kHS3Q4ftZDekRXUhjRb-cAm-mxPpRidrmsctxlqyZfuTcY4t8_zWRJrAwLYYB8qTH2XWFlOXtANzx9C1flmmoqSsf6U2vZDWF-AHyc2h1apbJv87LJlWE-45uwy_kw0ia2Jj_X6YTAmVl5-uELkVxhskXaqqEUDpXjA1F0QyU3PzZ6xNFqLHi-xTkaTGQtHgpGmp8ujmw4t5jIv-8Ri0Rb1i8DgtvQ9Kt2aD5R-6enCFwv5mzfLDozEB0WalUyNeDLEG3Bat39LFngOYq7VutWTW5RMw";
        if (accessToken) {
          sessionStorage.setItem("access_token", accessToken);

          const user = await fetchUserProfile(accessToken);
          sessionStorage.setItem("user", JSON.stringify(user));

          dispatch({ type: "LOGIN", payload: { isAuthenticated: true, user: null } });

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
        setTimeout(() => {
          setShowLoader(false);
        }, 3000); // Show loader for at least 10 seconds
      }
    })();
  }, []);

  if (showLoader || !state.isInitialized || !sessionStorage.getItem("user")) return <LoadingPage />;

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
