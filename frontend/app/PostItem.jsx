import { useState } from 'react'

import Image from "next/image";

// Icon
import { DotsThree, ThumbsUp, ChatCircleDots, Share, PaperPlaneRight, Trash } from 'phosphor-react'

// Image
import profileImg from '../public/assets/image/profile2.png'
import postImg from '../public/assets/image/post-image.png'

export default function PostItem({ profile, post }) {
  const [dropdown, setDropdown] = useState(false);

  return (
    <div className="mb-8">
      <div className="bg-white mx-4 sm:mx-0 p-6 drop-shadow-sm rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex"> 
            <div className="rounded-xl">
              <Image className="w-12 h-12" src={profile.image} alt="" />
            </div>
            <div className="ml-3">
              <h4>{profile.username}</h4>
              <span className="text-sm text-gray-400">{profile.role}</span>
            </div>
          </div>
          
          <div className="relative text-gray-600">
            <button className="" onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)}>
              <DotsThree size={24} />
            </button>
            
            <div className={`px-6 py-6 absolute top-0 right-0 transition-all duration-300 ${dropdown ? 'opacity-1' : 'opacity-0'}`} onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)}>
              <button className="flex items-center text-sm px-4 py-2 border bg-white hover:border-none hover:bg-red-600 hover:text-white rounded-lg">
                <Trash size={16} className="mr-1" />
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col mt-4">
          <Image src={post.image} className={`${post.image !== '' ? 'block' : 'hidden'} rounded-xl`} alt="" />
          <p className={`${post.image !== '' ? 'mt-4' : ''}`}>{post.content}</p>
        </div>

        {/* Footer */}
        <div className="flex flex-col mt-6">
          <div className="flex space-x-5 text-gray-600">
            <div className="flex">
              <button type="button">
                <ThumbsUp size={24} className="hover:text-blue-500 hover:scale-125 transition-all duration-300" />
              </button>
              <span className="ml-2">{post.like}</span>
            </div>
            <div className="flex">
              <button type="button">
                <ChatCircleDots size={24} className="hover:text-blue-500 hover:scale-125 transition-all duration-300" />
              </button>
              <span className="ml-2">{post.comment.length}</span>
            </div>
            <div className="w-full flex justify-end">
              <button type="button">
                <Share size={24} className="hover:text-blue-500 hover:scale-125 transition-all duration-300" />
              </button>
            </div>
          </div>
          <div className="mt-6 py-2 px-2 bg-gray-100 rounded-xl">
            <div className="flex justify-between items-center">
              <div className="w-1/12">
                <Image className="w-8" src={profileImg} alt="Profile" />
              </div>
              
              <input type="text" className="w-10/12 px-4 sm:px-2 md:px-0 bg-transparent outline-none" placeholder="Write a comment" />
              <button type="button" className="w-1/12 text-gray-600 hover:text-blue-500 transition-all duration-300">
                <PaperPlaneRight size={24} className="ml-auto" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
