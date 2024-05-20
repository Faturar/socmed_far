"use client"

import { useContext } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { TokenContext } from './TokenContext'

// Icon
import { House, Bell, ChatsCircle, User, SignIn, SignOut } from 'phosphor-react'

// Image
import logo from '../public/assets/image/logo.png'

export default function Navbar() {
    const {token, setToken} = useContext(TokenContext)
    
    return (
        <nav className=' bg-white text-gray-600 drop-shadow-sm'>
            <div className="container flex justify-start md:justify-between mx-auto p-6 md:px-8 lg:px-0">
                <div className='w-1/4 pr-6 lg:pr-0 flex items-center'>
                    <Image src={logo} alt="Logo" />
                </div>
                <div className='w-2/4 flex justify-between items-center px-6'>
                    <Link href="/" className=''>
                        <House size={28} className='text-blue-500' />
                    </Link>
                    <Link href="/">
                        <Bell size={28} />
                    </Link>
                    <Link href="/">
                        <ChatsCircle size={28} />
                    </Link>
                    <Link href="/">
                        <User size={28} />
                    </Link>
                </div>
                <div className='w-1/4 flex justify-end items-center md:pl-6'>
                    <Link href="/logout" className={token == null ? "hidden" : "flex items-center text-sm ml-3"}>
                        Logout
                        <SignOut size={28} className='ml-2' />
                    </Link>
                    <Link href="/login" className={token != null ? "hidden" : "flex items-center ml-3"}>
                        Login
                        <SignIn size={28} className='ml-2' />
                    </Link>
                </div>
            </div>
        </nav>
    )
}
