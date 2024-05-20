"use client"

import { createContext, useEffect, useState } from "react";

export const TokenContext = createContext();

// Create a provider component
export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const storedToken =
      typeof window !== "undefined" && window.localStorage.getItem("token");
    return storedToken || null;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("token", token || "");
    }
  }, [token]);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};