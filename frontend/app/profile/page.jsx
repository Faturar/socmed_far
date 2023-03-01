"use client"

import Image from "next/image"

// Components
import PostItem from "./PostItem"

// Icon
import { ImageSquare, PaperPlaneRight } from 'phosphor-react'

// Image
import profileImg from '../public/assets/image/profile1.png'


export default function Home() {
  const selectFile = () => {
    document.getElementById('imageUp').click();
  }

  return (
    <main className="container mx-auto flex justify-center">
      <div className="lg:w-1/2 mt-8 px-6 xl:px-0">
        <div className="bg-white mb-6 pt-6 pb-0 shadow-xs rounded-2xl overflow-hidden text-gray-600">
          <div className="flex px-6">
            <div className="rounded-xl">
              <Image className="w-10 h-10" src={profileImg} />
            </div>
            <div className="w-full">
              <textarea className="h-16 lg:h-20 ml-4 py-2 px-3 w-full outline-none" placeholder="Write something ..."></textarea>
            </div>
          </div>
          <div className="flex justify-between bg-blue-50">
            <input id="imageUp" type="file" className="hidden" />
            
            <button className="flex align-center ml-6 py-4" onClick={selectFile}>
              <ImageSquare className="mr-2" size={24} />
              Image
            </button>

            <button className="bg-blue-200 px-6 py-4">
              <PaperPlaneRight size={24} />
            </button>
          </div>
        </div>

        <PostItem image={false} />
        <PostItem image={true} />
      </div>
      
    </main>
  )
}
