import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";

import React from "react";
import {refreshToken} from "../utils/api.js";

const AuthContext = createContext(
  {
    user: null,
    handleSignIn: null,
    handleSignOut: null,
  } | undefined
);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(`${apiUrl}/auth/details`, {
          withCredentials: true,
        });
        const { username, email, role, fullName, events } = response.data;
        setUser({ username, email, role,fullName, events });
      } catch (error) {
        setUser(null);
      }
    }

    refreshToken();
    fetchUser().then(r => {});

  }, []);

  useEffect(() => {
    setInterval(() => {
      if(user!==null) refreshToken();

    }, 1800000); // Time expiration access token
  }, [user]);

  async function handleSignIn(dtoUser) {
    try {
      const response = await axios.post(
          `${apiUrl}/auth/signin`,
        dtoUser,
        {
          withCredentials: true,
        }
      );
      const { username, email, role, fullName, events } = response.data.user;
      setUser({ username, email, role, fullName, events });
      return {
        isCorrect: true,
        message: ""
      };
    } catch (error) {
      setUser(null);
      return {
        isCorrect: false,
        message: error.response.data
      };
    }
  }

  async function handleSignOut(dtoUser) {
    try {
      await axios
        .post(
            `${apiUrl}/auth/signout`,
          {},
          {
            withCredentials: true,
          }
        )
        .then(function (response) {
          setUser(null);
        })
        .catch(function (error) {
          setUser(null);
        });
    } catch {
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        handleSignIn,
        handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used inside of a AuthProvider");
  }

  return context;
}

export function isAuth(user) {
  if (user !== null && user !== undefined) {
    return true;
  }

  return false;
}

export function isMod(user) {
  if (user.role !== undefined) {
    if (user.role === "MODERATOR" || user.role === "ADMIN") return true;
  }
  return false;
}
