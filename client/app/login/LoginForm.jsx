"use client"

import { useContext, useState } from "react"
import { TokenContext } from '../TokenContext';

import Link from "next/link"

import loginRequest from "@/lib/auth/login"
import { redirect } from "next/navigation"

export default function LoginForm() {
  const {token, setToken, setUserData} = useContext(TokenContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    const data = {
      username, password
    }

    try {
      const res = await loginRequest(data);

      setToken(res.token);
      setUserData(res.user);

      redirect('/')
    } catch(err) {
      console.log(err.message)
    }
  }

  if(token != null) {
    redirect('/')
  } else {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="xl:w-1/4 lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml- w-full mt-10 md:mt-0 relative z-10 shadow-md">
            <h2 className="text-gray-900 text-2xl mb-1 font-bold title-font">Login</h2>
            <p className="leading-relaxed mb-5 text-gray-600">Login your account to continue to social media app</p>
            

            <form onSubmit={handleLogin} className="flex flex-col" method="POST">
              {/* username */}
              <div className="relative mb-4">
                <label htmlFor="username" className="leading-7 text-sm text-gray-600">Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} id="username" name="username" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" autoComplete="username" />
              </div>

              {/* password */}
              <div className="relative mb-4">
                <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" autoComplete="current-password" />
              </div>

              {/* login button */}
              <button type="submit" className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg mb-4">Login</button>

              {/* login with Google button */}
              <button type="button" className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 disabled:bg-gray-300 rounded text-lg" disabled={true}>Login With Google</button>

              {/* register link */}
              <p className="text-xs text-gray-500 mt-3">Dont have an account? <Link href="/register" className="text-blue-500">Register</Link></p>
            </form>
        </div>
      </div>
    )
  }
}