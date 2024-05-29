"use client"

import { useContext } from 'react'

import Link from 'next/link'

import { TokenContext } from './TokenContext'

// Icon
import { House, Bell, ChatsCircle, User, } from 'phosphor-react'

export default function Footer() {
    const { login } = useContext(TokenContext);

    const isPhone = window.innerWidth < 768;
  
    return (
        <footer className={`fixed flex justify-between items-center px-6 py-6 w-full bottom-0 bg-white text-gray-600 drop-shadow-sm ${!isPhone ? 'hidden' : ''}`}>
            <Link href="/" className=''>
                <House size={24} className='text-blue-500' />
            </Link>
            <Link href="/notification">
                <Bell size={24} />
            </Link>
            <Link href="/">
                <ChatsCircle size={24} />
            </Link>
            <Link href="/">
                <User size={24} />
            </Link>
        </footer>
    );
}