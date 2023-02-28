"use client"

import Image from 'next/image'
import Link from 'next/link'

// Icon
import { House, Bell, ChatCircleDots, User, SignIn, SignOut } from 'phosphor-react'

// Image
import logo from '../public/assets/image/logo.png'
import profileImg from '../public/assets/image/profile1.png'


export default function Navbar() {
  return (
    <nav className=' bg-white text-gray-600'>
        <div className="container flex justify-start md:justify-between mx-auto p-6 md:px-0">
            <div className='w-1/4 pr-8'>
                <Image src={logo} alt="Logo" />
            </div>
            <div className='md:w-2/4 flex justify-center items-center space-x-28'>
                <Link href="/" className=''>
                    <House size={28} className='text-blue-500' />
                </Link>
                <Link href="/">
                    <Bell size={28} />
                </Link>
                <Link href="/">
                    <ChatCircleDots size={28} />
                </Link>
                <Link href="/">
                    <User size={28} />
                </Link>
            </div>
            <div className='md:w-1/4 flex justify-end items-center pl-6'>
                <Link href="/" className='flex items-center ml-3'>
                    Logout
                    <SignOut size={28} className='ml-2' />
                </Link>
                <Link href="/" className='flex items-center ml-3'>
                    Login
                    <SignIn size={28} className='ml-2' />
                </Link>
            </div>
        </div>
    </nav>
  )
}
