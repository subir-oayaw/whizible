import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
// CUSTOM COMPONENT
import { WhizLoading } from "app/components";

const initialState = {
  user: null,
  isInitialized: false,
  isAuthenticated: false
};

const handleMicrosoftSignIn = () => {
  const baseurlAccessControl = process.env.REACT_APP_BASEURL_ACCESS_CONTROL;
  const redirectUri = process.env.REACT_APP_REDIRECT_URI;

  window.location.href =
    baseurlAccessControl +
    `/api/Authentication/login?redirectUri=${encodeURIComponent(redirectUri)}`;
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

  const login = async (email, password) => {
    const response = await axios.post("/api/auth/login", { email, password });
    const { user } = response.data;

    dispatch({ type: "LOGIN", payload: { user } });
    sessionStorage.setItem("access_token", response.data.token);
  };

  const register = async (email, username, password) => {
    const response = await axios.post("/api/auth/register", { email, username, password });
    const { user } = response.data;

    dispatch({ type: "REGISTER", payload: { user } });
    sessionStorage.setItem("access_token", response.data.token);
  };

  const logout = () => {
    sessionStorage.removeItem("access_token");
    dispatch({ type: "LOGOUT" });
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
        const url = window.location.href;
        const codeMatch = url.match(/[?&]code=([^&]+)/);
        const stateMatch = url.match(/[?&]state=([^&]+)/);
        const code = codeMatch ? codeMatch[1] : null;
        const state = stateMatch ? stateMatch[1] : null;

        if (code && state) {
          const redirectUri = process.env.REACT_APP_REDIRECT_URI;
          const baseurlAccessControl = process.env.REACT_APP_BASEURL_ACCESS_CONTROL;

          // Call the API to get the token
          const response = await axios.get(
            `${baseurlAccessControl}/api/Authentication/GetToken?code=${code}&state=${state}&redirectUri=${encodeURIComponent(
              redirectUri
            )}`
          );

          const { accessToken } = response.data;
          if (accessToken) {
            sessionStorage.setItem("access_token", accessToken);

            const userProfileResponse = await axios.get(
              process.env.REACT_APP_BASEURL_ACCESS_CONTROL + "/api/UserProfile",
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`
                }
              }
            );

            const user = userProfileResponse.data.data.data;
            sessionStorage.setItem("user", JSON.stringify(user));
            dispatch({ type: "LOGIN", payload: { isAuthenticated: true, user: null } });
          } else {
            dispatch({ type: "INIT", payload: { isAuthenticated: false, user: null } });
          }
        }
      } catch (err) {
        console.error("Initialization failed", err);
        dispatch({ type: "INIT", payload: { isAuthenticated: false, user: null } });
      }
    })();
  }, []);

  // SHOW LOADER
  if (!state.isInitialized) return <WhizLoading />;

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
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
