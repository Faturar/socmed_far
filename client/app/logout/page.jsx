"use client"

import { redirect } from "next/navigation";
import { useContext } from "react";
import { TokenContext } from "../TokenContext";

// next
export default function Page() {
    const {token, setToken} = useContext(TokenContext)

    window.localStorage.removeItem('token');
    setToken(null)

    return redirect('/')
}
