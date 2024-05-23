"use client"

import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { TokenContext } from "../TokenContext";
import Loading from "../components/Loading";

// next
export default function Page() {
    const { setToken, setUserData, setLoading } = useContext(TokenContext);
    const router = useRouter()

    useEffect(() => {
      setLoading(true)
      const clearTokenAndUserData = () => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
        setToken(null);
        setUserData(null);
      };
  
      clearTokenAndUserData();
      router.push('/')
    }, [setToken, setUserData]);
  
    return <Loading />
  }