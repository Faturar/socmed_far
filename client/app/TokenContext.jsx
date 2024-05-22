"use client"

import { createContext, useEffect, useState } from "react";

export const TokenContext = createContext();

// Create a provider component
export const TokenProvider = ({ children }) => {
  const getInitialToken = () => {
    const storedToken = window.localStorage.getItem("token");
    return storedToken || null;
  };

  const getInitialUserData = () => {
    const storedUserData = JSON.parse(window.localStorage.getItem("user"));
    return storedUserData || null;
  };

  const [token, setToken] = useState(getInitialToken);
  const [login, setLogin] = useState(false);
  const [userData, setUserData] = useState(getInitialUserData);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("token", token || "");
      if (userData) {
        window.localStorage.setItem("user", JSON.stringify(userData));
      }
    }
    if (token) {
      setLogin(true)
    } else {
      setLogin(false)
    }
  }, [token, userData]);

  return (
    <TokenContext.Provider value={{ token, setToken, userData, setUserData, login, setLogin }}>
      {children}
    </TokenContext.Provider>
  );
};
