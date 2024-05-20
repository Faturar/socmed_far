"use client"

import { useState, useRef, useContext } from 'react'

import Image from "next/image"
import { useRouter } from 'next/navigation'

// Lib
import deletePost from '../../lib/posts/deletePost'

// Icon
import { PaperPlaneRight, DotsThree, ThumbsUp, ChatCircleDots, Share, Trash, Pencil, ImageSquare, X } from 'phosphor-react'

// Image
import profileImg from '@/public/assets/image/profile1.png'
import editPost from '@/lib/posts/editPost'
import { TokenContext } from '../TokenContext'

export default function PostItem({ post }) {
  const router = useRouter();

  const {token, setToken} = useContext(TokenContext)

  const [dropdown, setDropdown] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [edit, setEdit] = useState(false);

  const [image, setImage] = useState(null)
  const [content, setContent] = useState(post.content)

  const api_url = process.env.NEXT_PUBLIC_API_STATIC;

  const selectFileEl = useRef();

  const selectFile = () => {
    selectFileEl.current.click();
  }

  const imageFile = () => {
    setImage(selectFileEl.current.files[0])
  }

  const onClickDelete = async (id) => {
    try {
      const res = await deletePost(id)

      alert(res.message)
    } catch(err) {
      alert(err.message)
    }

    router.refresh();
  }

  const onClickEdit = async (content) => {
    setContent(content)
    setEdit(true)
  }

  const editHandle = async (id, userId) => {

    const data = {
      userId,
      image,
      content,
      token,
    }
    
    try {
      const res = await editPost(id, data);

      alert(res.message)
      setEdit(false)
    } catch(err) {
      alert(err.message)
    }

    setImage(null)
    setContent('')
    router.refresh();
  }

  return (
    <div className="mb-8">
      <div className="bg-white mx-4 sm:mx-0 p-6 drop-shadow-sm rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex"> 
            <div className="rounded-xl">
              {post.user_profile_img != null ? <Image className="w-12 h-12 rounded-full" src={api_url + post.user_profile_img} width={512} height={512} alt="" /> : <Image className="w-12 h-12 rounded-full" src={profileImg} width={512} height={512} alt="" />}
            </div>
            <div className="ml-3">
              <h4>{post.user_username}</h4>
              <span className="text-sm text-gray-400">{post.user_role}</span>
            </div>
          </div>
          
          <div className="relative text-gray-600">
            <button className="" onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)}>
              <DotsThree size={24} />
            </button>
            
            <div className={`z-50 px-6 py-6 flex flex-col absolute top-0 right-0 transition-all duration-300 ${dropdown ? 'opacity-1' : 'opacity-0'}`} onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)}>
              <button onClick={() => onClickEdit(post.content)} className="flex items-center text-sm px-4 py-2 bg-white hover:bg-gray-500 hover:text-white rounded-t-lg">
                <Pencil size={16} className="mr-2" />
                Edit
              </button> 

              <button onClick={() => onClickDelete(post.id)} className="flex items-center text-sm px-4 py-2 bg-white hover:bg-red-600 hover:text-white rounded-b-lg">
                <Trash size={16} className="mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col mt-4">
          {edit ? <span className='mb-2 text-red-500'>Edit mode active</span> : ''}
          <div className="relative" onMouseEnter={() => setEditImage(true)} onMouseLeave={() => setEditImage(false)}>
            {post.image && image == null ? <Image src={api_url + post.image} width={1000} height={1000} className={`rounded-xl ${edit && editImage ? 'opacity-80':''}`} alt="" /> : ''}

            {image != null ? <Image className="w-fit rounded-xl" src={URL.createObjectURL(image)} width={1080} height={1080} alt="" /> : ''}
            
            {edit && editImage ? <button className='px-6 py-2 bg-white text-blue-500 absolute -ml-10 top-1/2 left-1/2 rounded-lg' onClick={selectFile}>Change</button> : ''}
          </div>
          <p className={`${post.image ? 'mt-4' : ''}${edit ? ' hidden' : ''}`}>{post.content}</p>
          

          {/* edit */}
          <input ref={selectFileEl} type="file" className="hidden" onChange={imageFile} />

          <textarea defaultValue={content} onChange={(e) => setContent(e.target.value)} className={`h-16 lg:h-20 py-2 px-3 rounded-t-lg w-full border outline-none ${post.image ? 'mt-4' : ''}${!edit ? ' hidden' : ''}`} placeholder="Write something ..."></textarea>

          <div className={`flex justify-between rounded-b-lg bg-gray-50 ${!edit ? ' hidden' : ''}`}>
            <button className="flex items-center ml-4 py-2 text-sm hover:text-red-500 transition-all duration-300" onClick={() => setEdit(false)}>
              <X size={16} className="mr-2 align-middle" />
              Cancel
            </button>

            <button onClick={() => editHandle(post.id, post.user_id)} className="bg-gray-100 px-6 py-3 rounded-br-lg" >
              <PaperPlaneRight size={16} className="hover:text-blue-500 hover:scale-125 transition-all duration-300" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col mt-6">
          <div className="flex space-x-5 text-gray-600">
            <div className="flex">
              <button type="button">
                <ThumbsUp size={24} className="hover:text-blue-500 hover:scale-125 transition-all duration-300" />
              </button>
              {/* <span className="ml-2">{post.like}</span> */}
            </div>
            <div className="flex">
              <button type="button">
                <ChatCircleDots size={24} className="hover:text-blue-500 hover:scale-125 transition-all duration-300" />
              </button>
              {/* <span className="ml-2">{post.comment.length}</span> */}
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
                {post.user_profile_img != null ? <Image className="w-8 rounded-full" src={api_url + post.user_profile_img} width={512} height={512} alt="Profile" /> : <Image className="w-8 rounded-full" src={profileImg} width={512} height={512} alt="Profile" />}
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
