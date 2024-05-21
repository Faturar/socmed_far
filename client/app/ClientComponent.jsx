"use client"

import { useState, useRef, useContext } from 'react'

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
  const {token, setToken} = useContext(TokenContext)
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

  const create = async (userId) => {
    const data = {
      userId,
      image,
      content,
      token,
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
    <>
      <Navbar />
      <main className="container mx-auto flex justify-between pt-8">
        {/* Left side */}
        <LeftSide />

        {/* Main side */}
        <div className="lg:w-2/4 px-6">
          <div className="bg-white mx-4 sm:mx-0 mb-6 pt-6 pb-0 drop-shadow-sm rounded-2xl overflow-hidden text-gray-600">
            <div className={token && token == null ? 'mb-8 px-6' : ''}>
              <h2 className='mb-0 text-lg text-red-500'>{token && token == null ? 'Login to create post' : ''}</h2>
            </div>
            
            {/* Add Post */}
            <div className="flex px-6">
              <div className="rounded-xl">
                <Image className="w-10 h-10" src={profileImg} alt="" />
              </div>
              <div className="w-full">
                <textarea value={content} onChange={(e) => setContent(e.target.value)} disabled={token == null} className="h-16 lg:h-20 ml-4 py-2 px-3 w-full outline-none disabled:bg-gray-100" placeholder="Write something ..."></textarea>
              </div>
            </div>

            {/* Image Preview */}
            <div className="flex rounded-xl px-6 pt-0 pb-6">
              {image != null ? <Image className="w-fit rounded-xl" src={URL.createObjectURL(image)} width={1080} height={1080} alt="" /> : ''}
            </div>
            
            {/* Form */}
            <div className="flex justify-between bg-blue-50">
              <input ref={selectFileEl} type="file" className="hidden" onChange={imageFile} disabled={token == null} />
               
              <button className={`flex items-center ml-6 py-4 ${token == null ? 'text-gray-500 translate-none' : 'hover:text-blue-500 transition-all duration-300'}`} disabled={token == null} onClick={selectFile}>
                <ImageSquare size={24} className={`mr-2 ${token == null ? '' : 'hover:mr-3 hover:text-blue-500 hover:scale-125 transition-all duration-300'}`} />
                Image
              </button>

              <button className="bg-blue-100 px-6 py-3 disabled:bg-gray" onClick={() => create(post.user_id)} disabled={token == null}>
                <PaperPlaneRight size={24} className={token == null ? 'transition-none text-gray-500' : 'hover:text-blue-500 hover:scale-125 transition-all duration-300'} />
              </button>
            </div>
          </div>

          {children}
        </div>

        {/* Right side */}
        <RightSide />
      </main>
    </>
  )
}
