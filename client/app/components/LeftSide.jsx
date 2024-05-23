"use client"

import { useContext } from 'react'

import Image from "next/image"

import { TokenContext } from '../TokenContext'

function LeftSide() {
  const {token, userData} = useContext(TokenContext)

  const api_url = process.env.NEXT_PUBLIC_API_STATIC;

  return (
    <div className="hidden lg:flex lg:w-1/4 pr-2">
        <div className={`w-full relative ${!token ? 'hidden' : ''}`}>
          <div className="sticky top-12 flex flex-col bg-white mb-6 drop-shadow-sm rounded-2xl text-gray-600">
              <Image src={userData ? api_url + userData.profileBg : ''} width={512} height={200} alt="" className="rounded-t-xl h-16 object-cover" />
              <div className="flex px-2">
                <Image src={userData ? api_url + userData.profileImg : ''} width={512} height={512} alt="" className="ml-3 -mt-6 w-12 h-12 object-cover" />
              <div className="flex flex-col ml-3 mt-1">
                <h4 className="text-base text-black">{userData ? userData.name : ''}</h4>
                <p className="text-sm text-gray-500">{userData ? userData.role : ''}</p>
              </div>
              </div>
              <button className="mx-6 mb-6 mt-3 py-2 text-sm border border-gray-500 hover:bg-gray-500 hover:text-white rounded-xl transition-all duration-300">Edit</button>
          </div>
        </div>
    </div>
  )
}

export default LeftSide