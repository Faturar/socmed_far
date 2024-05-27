"use client"

import { createContext, useEffect, useState } from "react";

export const TokenContext = createContext();

// Create a provider component
export const TokenProvider = ({ children }) => {
  const getInitialToken = () => {
    const storedToken =  window.localStorage.getItem("token");
    return storedToken ? storedToken : null;
  };

  const getInitialUserData = () => {
    const storedUserData = JSON.parse(window.localStorage.getItem("user"));
    return storedUserData ? storedUserData : null;
  };

  const [token, setToken] = useState(getInitialToken());
  const [login, setLogin] = useState(Boolean(token));
  const [userData, setUserData] = useState(getInitialUserData());

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("token", token || "");
      window.localStorage.setItem("user", JSON.stringify(userData) || "");
    }
  }, [token, userData]);

  return (
    <TokenContext.Provider value={{ token, setToken, userData, setUserData, login, setLogin, loading, setLoading }}>
      {children}
    </TokenContext.Provider>
  );
};
