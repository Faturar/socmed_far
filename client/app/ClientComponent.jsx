"use client"

import { useState, useRef, useContext, useEffect } from 'react'

// next
import Image from "next/image"
import {useRouter} from "next/navigation"

// Lib
import createPost from '@/lib/posts/createPost'

// Components
import LeftSide from './components/LeftSide'
import RightSide from './components/RightSide'

// Icon
import { ImageSquare, PaperPlaneRight } from 'phosphor-react'

// Image
import profileImg from '@/public/assets/image/profile1.png'
import Navbar from './Navbar'
import { TokenContext } from './TokenContext'


export default function ClientComponent({children}) { 
  const {token, login, userData} = useContext(TokenContext)
  const [image, setImage] = useState(null)
  const [content, setContent] = useState(null)

  const router = useRouter();
  const selectFileEl = useRef();

  const api_url = process.env.NEXT_PUBLIC_API_STATIC;

  const selectFile = () => {
    selectFileEl.current.click();
  }

  const imageFile = () => {
    setImage(selectFileEl.current.files[0])
  }

  const create = async () => {
    const data = {
      userId: userData.id,
      image,
      content,
      token,
    }

    try {
      const res = await createPost(data, token);

      return
    } catch(err) {
      console.log(err.message)
    }

    setImage(null)
    setContent('')
    router.refresh();
  }

  return (
    <section>
      <Navbar />
      <main className="container mx-auto flex justify-between pt-8">
        {/* Left side */}
        <LeftSide />

        {/* Main side */}
        <div className="lg:w-2/4 px-6">
          <div className={`bg-white mx-4 sm:mx-0 mb-6 pt-6 pb-0 drop-shadow-sm rounded-2xl overflow-hidden text-gray-600 ${!login ? 'hidden' : ''}`}>            
            {/* Add Post */}
            <div className="px-6 flex">
              <div className="rounded-xl">
              {userData ? <Image className="w-10 h-10 object-cover" src={api_url + userData.profileImg} width={512} height={512} alt="" /> : <Image className="w-10 h-10 object-cover" src={profileImg} width={512} height={512} alt="" />}
              </div>
              <div className="w-full">
                <textarea value={content} onChange={(e) => setContent(e.target.value)} disabled={!login} className="h-16 lg:h-20 ml-4 py-2 px-3 w-full outline-none disabled:bg-gray-100" placeholder="Write something ..."></textarea>
              </div>
            </div>

            {/* Image Preview */}
            <div className="flex rounded-xl px-6 pt-0 pb-6">
              {image ? <Image className="w-fit rounded-xl" src={URL.createObjectURL(image)} width={1080} height={1080} alt="" /> : ''}
            </div>
            
            {/* Form */}
            <div className="flex justify-between bg-blue-50">
              <input ref={selectFileEl} type="file" className="hidden" onChange={imageFile} disabled={!login} />
               
              <button
                className={`flex items-center ml-6 py-4 ${
                  !login ? 'text-gray-500 translate-none' : 'hover:text-blue-500 transition-all duration-300'
                }`}
                disabled={!login}
                onClick={selectFile}
              >
                <ImageSquare size={24} className={`mr-2 ${!login ? '' : 'hover:mr-3 hover:text-blue-500 hover:scale-125 transition-all duration-300'}`} />
                Image
              </button>

              <button
                className={`bg-blue-100 px-6 py-3 ${!login ? 'disabled:bg-gray' : ''}`}
                onClick={create}
                disabled={!login}
              >
                <PaperPlaneRight size={24} className={`${!login ? 'transition-none text-gray-500' : 'hover:text-blue-500 hover:scale-125 transition-all duration-300'}`} />
              </button>
            </div>
          </div>

          {children}
        </div>

        {/* Right side */}
        <RightSide />
      </main>
    </section>
  )
}
