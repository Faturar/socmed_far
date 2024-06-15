"use client"

import { useContext, useEffect, useState } from 'react'

import Link from 'next/link'

import { TokenContext } from './TokenContext'

// Icon
import { House, Bell, ChatsCircle, User, } from 'phosphor-react'

export default function Footer() {
    const { login } = useContext(TokenContext);

    const [isPhone, setIsPhone] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsPhone(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
  
    return (
        <footer className={`fixed flex justify-between items-center px-6 py-6 w-full bottom-0 bg-white text-gray-600 drop-shadow-sm ${!isPhone ? 'hidden' : ''}`}>
            <Link href="/" className=''>
                <House size={24} className='text-blue-500' />
            </Link>
            <Link href="/notification">
                <Bell size={24} />
            </Link>
            <Link href="/">
                <User size={24} />
            </Link>
        </footer>
    );
}