"use client"

import { useState, useRef } from 'react'

// next
import Image from "next/image"
import {useRouter} from "next/navigation"

// Lib
import createPost from '@/lib/posts/createPost'

// Icon
import { ImageSquare, PaperPlaneRight } from 'phosphor-react'

// Image
import profileImg from '@/public/assets/image/profile1.png'
import profileBg from '@/public/assets/image/profile-bg.png'

// data
import { suggestions } from './data'

export default function ClientComponent({children}) { 
  const [image, setImage] = useState(null)
  const [content, setContent] = useState('')

  const router = useRouter();
  const selectFileEl = useRef();

  const selectFile = () => {
    selectFileEl.current.click();
  }

  const imageFile = () => {
    setImage(selectFileEl.current.files[0])
  }

  const create = async () => {
    const data = {
      userId: 1,
      image,
      content
    }

    try {
      const res = await createPost(data);

      alert(res.message)
    } catch(err) {
      alert(err.message)
    }

    setImage(null)
    setContent('')
    router.refresh();
  }

  return (
    <main className="container mx-auto flex justify-between pt-8">
      {/* Left side */}
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

      {/* Main side */}
      <div className="lg:w-2/4 px-6">
        <div className="bg-white mx-4 sm:mx-0 mb-6 pt-6 pb-0 drop-shadow-sm rounded-2xl overflow-hidden text-gray-600">
          <div className="flex px-6">
            <div className="rounded-xl">
              <Image className="w-10 h-10" src={profileImg} alt="" />
            </div>
            <div className="w-full">
              <textarea value={content} onChange={(e) => setContent(e.target.value)} className="h-16 lg:h-20 ml-4 py-2 px-3 w-full outline-none" placeholder="Write something ..."></textarea>
            </div>
          </div>
          <div className="flex rounded-xl p-6">
            {image != null ? <Image className="w-fit rounded-xl" src={URL.createObjectURL(image)} width={1080} height={1080} alt="" /> : ''}
          </div>
          <div className="flex justify-between bg-blue-50">
            <input ref={selectFileEl} type="file" className="hidden" onChange={imageFile} />
            
            <button className="flex items-center ml-6 py-4 hover:text-blue-500 transition-all duration-300" onClick={selectFile}>
              <ImageSquare size={24} className="mr-2 hover:mr-3 hover:text-blue-500 hover:scale-125 transition-all duration-300" />
              Image
            </button>

            <button className="bg-blue-100 px-6 py-3" onClick={() => create()}>
              <PaperPlaneRight size={24} className="hover:text-blue-500 hover:scale-125 transition-all duration-300" />
            </button>
          </div>
          
        </div>

        {children}
      </div>

      {/* Right side */}
      <div className="hidden lg:flex lg:w-1/4 pl-2">
        <div className="w-full relative">
          <div className="sticky top-12 flex flex-col bg-white px-6 py-6 mb-6 drop-shadow-sm rounded-2xl overflow-hidden text-gray-600">
              <h2 className="text-xl">Suggestion for you:</h2>

              {/* Suggestion item */}
              {suggestions.map((item, index) => (
                <div key={index} className="flex flex-col mt-6">
                    <div className="flex justify-between">
                    <div className="flex">
                        <Image src={item.profile} alt="" className="w-10 h-10" />
                        <div className="flex flex-col ml-3">
                        <h4 className="text-base">{item.name}</h4>
                        <p className="text-xs">{item.role}</p>
                        </div>
                    </div>
                    <div>
                        <button type="button" className="py-2 px-4 text-sm border text-blue-500 border-blue-500 hover:text-white hover:bg-blue-500 rounded-xl">Follow</button>
                    </div>
                    </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  )
}
