import React from 'react'

import Image from "next/image"

import profileImg from '@/public/assets/image/profile1.png'
import profileBg from '@/public/assets/image/profile-bg.png'

function LeftSide() {
  return (
    <div className="hidden lg:flex lg:w-1/4 pr-2">
        <div className="w-full relative">
          <div className="sticky top-12 flex flex-col bg-white mb-6 drop-shadow-sm rounded-2xl text-gray-600">
              <Image src={profileBg} alt="" className="rounded-t-xl h-16" />
              <div className="flex px-2">
              <Image src={profileImg} alt="" className="ml-3 -mt-6 w-12 h-12" />
              <div className="flex flex-col ml-3 mt-1">
                  <h4 className="text-base text-black">Ahmad Syahroni</h4>
                  <p className="text-sm text-gray-500">UI/UX Designer</p>
              </div>
              </div>
              <button className="mx-6 mb-6 mt-3 py-2 text-sm border border-gray-500 hover:bg-gray-500 hover:text-white rounded-xl transition-all duration-300">Edit</button>
          </div>
        </div>
    </div>
  )
}

export default LeftSide