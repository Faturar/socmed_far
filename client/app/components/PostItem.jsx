"use client"

import { useState, useRef, useContext, useEffect } from 'react'

import Image from "next/image"
import { useRouter } from 'next/navigation'

// Lib
import deletePost from '../../lib/posts/deletePost'

// Icon
import { PaperPlaneRight, DotsThree, ThumbsUp, ChatCircleDots, Share, Trash, Pencil, X, Heart, UserPlus } from 'phosphor-react'

// Image
import profileImg from '@/public/assets/image/default.png'
import editPost from '@/lib/posts/editPost'
import { TokenContext } from '../TokenContext'
import createLike from '@/lib/likes/createLike'
import deleteLike from '@/lib/likes/deleteLike'
import { toast } from 'sonner'
import getPostComments from '@/lib/comments/getPostComments'
import createComment from '@/lib/comments/createComment'

export default function PostItem({ post, userLikes, getUserLikes, getData}) {
  const router = useRouter();

  const {token, userData, setLoading} = useContext(TokenContext)

 
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [commentsOpen, setCommentOpen] = useState(false);
  const [commentsData, setCommentsData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  
  const [loadMore, setLoadMore] = useState(true);
  const [editImage, setEditImage] = useState(false);
  const [edit, setEdit] = useState(false);

  const [image, setImage] = useState(null)
  const [content, setContent] = useState(post.content)
  const [dropdown, setDropdown] = useState(false);

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
      setLoading(true)
      await deletePost(id, token)
      getData()
      setLoading(false)
    } catch (err) {
      console.log(err.message)
    }
  }

  const onClickEdit = async (content) => {
    setContent(content)
    setEdit(true)
  }

  const editHandle = async (id, userId, likes, comments, shares) => {
    const data = {
      userId,
      image,
      content,
      likes,
      comments,
      shares,
    }

    try {
      setLoading(true)
    
      await editPost(id, data, token);
      setEdit(false);

      setImage(null)
      setContent('')
      
      getData()
    } catch(err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const onClickLike = async (postId, likes) => {
    if(!userData) {
      return toast.error('Please Login To Like!')
    }

    const data = {
      userId: userData ? userData.id : null,
      postId,
      likes,
    }

    setLiked(false)

    try {
      const res = await createLike(data, token)

      if(res.status == false) {
        await deleteLike(res.like.id, token);
      }

      if(userData) {
        getUserLikes()
      }

      return getData()
    } catch(err) {
      console.log(err.message)
    }

    router.refresh();
  }

  const onClickComment = async () => {
    setCommentOpen(!commentsOpen)

    if(!commentsOpen) {
      const res = await getPostComments(post.id, token, limit, offset);

      setCommentsData(res.data)

      setOffset(offset + 10)
    } else {
      setCommentsData([])
      setOffset(0)
    }
  }

  const onClickLoadMoreComments = async () => {
    const res = await getPostComments(post.id, token, limit, offset);

    setCommentsData(commentsData => [...commentsData, ...res.data] );

    if(parseInt(res.data.length) < 10) {
      const offsetMin = parseInt(res.data.length) - 10;

      setOffset(offset + offsetMin)

      setLoadMore(false)
    }

    setOffset(offset + 10)

    // console.log(offset)
  }

  const handleCreateComment = async () => {
    if(!userData) {
      return toast.error('Please Login To Comment!')
    }

    if(comment == '') {
      return toast.error('Please write something!')
    }

    const data = {
      userId: userData.id,
      postId: post.id,
      description: comment
    }

    const res = await createComment(data, token)
    const newComment = [];

    newComment.push(res.data);

    console.log(res.data)
  
    setCommentsData(commentsData => [...newComment, ...commentsData] );

    setComment('')
  }

  useEffect(() => { 
    userLikes.map(item => {
        if (item.post_id == post.id) {
          setLiked(true)
        }
      }
    )
  }, [userLikes])

  return (
    <div className="mb-8">
      <div className="bg-white mx-4 sm:mx-0 p-6 drop-shadow-sm rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex"> 
            <div className="rounded-xl">
              {post ? <Image className="w-12 h-12 rounded-full object-cover" src={api_url + post.user_profile_img} width={512} height={512} alt="" /> : <Image className="w-12 h-12 rounded-full object-cover" src={profileImg} width={512} height={512} alt="" />}
            </div>
            <div className="ml-3">
              <h4>{post.user_username}</h4>
              <span className="text-sm text-gray-400">{post.user_role}</span>
            </div>
          </div>
          
          {/* User Follow Button */}
          <button className={userData && userData.id == post.user_id || !userData ? 'hidden' : ''}>
              <UserPlus className='text-gray-600' size={24} />
          </button>

          {/* Dropdown Button */}
          <div className={`relative text-gray-600 ${userData && userData.id != post.user_id || !userData ? 'hidden' : ''}`}>
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
          
          <p className={`${post.image ? 'mb-4' : ''}${edit ? ' hidden' : ''}`}>{post.content}</p>
          
          <div className="relative" onMouseEnter={() => setEditImage(true)} onMouseLeave={() => setEditImage(false)}>
            {post.image && image == null ? <Image src={api_url + post.image} width={1000} height={1000} className={`rounded-xl ${edit && editImage ? 'opacity-80':''}`} alt="" /> : ''}

            {image != null ? <Image className="w-fit rounded-xl" src={URL.createObjectURL(image)} width={1080} height={1080} alt="" /> : ''}
            
            {edit && editImage ? <button className='px-6 py-2 bg-white text-blue-500 absolute -ml-10 top-1/2 left-1/2 rounded-lg' onClick={selectFile}>Change</button> : ''}
          </div>

          {/* edit */}
          <input ref={selectFileEl} type="file" className="hidden" onChange={imageFile} />

          <textarea defaultValue={content} onChange={(e) => setContent(e.target.value)} className={`h-16 lg:h-20 py-2 px-3 rounded-t-lg w-full border outline-none ${post.image ? 'mt-4' : ''}${!edit ? ' hidden' : ''}`} placeholder="Write something ..."></textarea>

          <div className={`flex justify-between rounded-b-lg bg-gray-50 ${!edit ? ' hidden' : ''}`}>
            <button className="flex items-center ml-4 py-2 text-sm hover:text-red-500 transition-all duration-300" onClick={() => setEdit(false)}>
              <X size={16} className="mr-2 align-middle" />
              Cancel
            </button>

            <button onClick={() => editHandle(post.id, post.user_id, post.likes, post.comments, post.shares)} className="bg-gray-100 px-6 py-3 rounded-br-lg" >
              <PaperPlaneRight size={16} className="hover:text-blue-500 hover:scale-125 transition-all duration-300" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col mt-6">
          {/* Action button */}
          <div className="flex space-x-5 text-gray-600">
            <div className="flex">
              <button type="button" onClick={() => onClickLike(post.id, post.likes)}>
                {post.likes >= 1 && liked ? <ThumbsUp size={24} weight='fill' className="text-blue-500 hover:scale-125 transition-all duration-300" /> : <ThumbsUp size={24} className="text-gray-500 hover:scale-125 transition-all duration-300" />}
              </button>
              {post.likes > 0 ? <span className="ml-2">{post.likes}</span> : ''}
            </div>
            <div className="flex">
              <button type="button" onClick={() => onClickComment()}>
                <ChatCircleDots size={24} className="hover:text-blue-500 hover:scale-125 transition-all duration-300" />
              </button>
              {post.comments > 0 ? <span className="ml-2">{post.comments}</span> : ''}
            </div>
            <div className="w-full flex justify-end">
              <button type="button">
                <Share size={24} className="hover:text-blue-500 hover:scale-125 transition-all duration-300" />
              </button>
            </div>
          </div>
          
          {/* Comment Container */}
          <div className={`flex flex-col h-48 mt-4 overflow-y-scroll ${commentsOpen ? '' : 'hidden'}`}>
            {/* Comments item */}
            {commentsData.map(item => (
              <div className='flex bg-gray-100 rounded-xl mb-2 p-4'>
                <div className='w-1/12'>
                  {item.profile_img ? <Image className="w-8 rounded-full object-cover" src={api_url + item.profile_img} width={512} height={512} alt="Profile" /> : <Image className="w-8 rounded-full object-cover" src={profileImg} width={512} height={512} alt="Profile" />}
                </div>
                <div className='w-11/12'>
                  <h4 className='m-0 text-md'>{item.username}</h4>
                  <p className='m-0 text-sm text-gray-600'>{item.description}</p>
                </div>
              </div>
            ))}
            <button className={`text-blue-500 text-start ${!loadMore ? 'hidden' : ''}`} onClick={onClickLoadMoreComments}>Load More</button>
          </div>

          {/* Comment input */}
          <div className="mt-4 py-2 px-2 bg-gray-100 rounded-xl">
            <div className="flex justify-between items-center">
              <div className="w-1/12">
                {userData ? <Image className="w-8 rounded-full object-cover" src={api_url + userData.profileImg} width={512} height={512} alt="Profile" /> : <Image className="w-8 rounded-full object-cover" src={profileImg} width={512} height={512} alt="Profile" />}
              </div>
              
              <input type="text" value={comment} onChange={e => setComment(e.target.value)} className="w-10/12 px-4 sm:px-2 md:px-0 bg-transparent outline-none" placeholder="Write a comment" />
              <button type="button" onClick={handleCreateComment} className="w-1/12 text-gray-600 hover:text-blue-500 transition-all duration-300">
                <PaperPlaneRight size={24} className="ml-auto" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}