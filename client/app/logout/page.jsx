"use client"

import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { TokenContext } from "../TokenContext";

// next
export default function Page() {
    const { setToken, setUserData } = useContext(TokenContext);
    const router = useRouter()

    useEffect(() => {
      const clearTokenAndUserData = () => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
        setToken(null);
        setUserData(null);
      };
  
      clearTokenAndUserData();
      router.push('/')
    }, [setToken, setUserData]);
  
    return null
  }