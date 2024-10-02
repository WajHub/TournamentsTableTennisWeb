import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";

import React from "react";

const AuthContext = createContext({
  user: null,
  handleSignIn: null,
  handleSignOut: null,
});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        axios
          .get("http://localhost:8080/auth/details", {
            withCredentials: true,
          })
          .then(function (response) {
            const { email, roles } = response.data;
            setUser({ email, roles });
          })
          .catch(function (error) {
            if (error.response) {
              setUser(null);
            }
          });
      } catch {
        setUser(null);
      }
    }

    fetchUser();
  }, []);

  async function handleSignIn(dtoUser) {
    try {
      console.log(dtoUser);
      await axios
        .post("http://localhost:8080/auth/signin", dtoUser, {
          withCredentials: true,
        })
        .then(function (response) {
          const { email, roles } = response.data;
          setUser({ email, roles });
        })
        .catch(function (error) {});
    } catch {
      setUser(null);
    }
  }

  async function handleSignOut(dtoUser) {
    try {
      await axios
        .post(
          "http://localhost:8080/auth/signout",
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

  if (context === null) {
    throw new Error("useAuth must be used inside of a AuthProvider");
  }

  return context;
}

export function isAuth(user) {
  if (user != null) return true;
  return false;
}
