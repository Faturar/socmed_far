import React, { useContext, useState } from 'react'

import profileImg from '@/public/assets/image/default.png'

import deleteComments from '@/lib/comments/deleteComment'
import { TokenContext } from '../TokenContext';
import { Check, PencilSimple, Trash, X } from 'phosphor-react';
import Image from 'next/image';
import editComment from '@/lib/comments/editComment';
import { toast } from 'sonner';

function CommentItem({item, commentsData, setCommentsData, postComments, setPostComments}) {
    const api_url = process.env.NEXT_PUBLIC_API_STATIC;

    const {token, userData} = useContext(TokenContext)

    const [comment, setComment] = useState(item);

    const [editCommentInput, setEditCommentInput] = useState(false);
    const [editCommentValue, setEditComentValue] = useState(comment.description);
    

    const onClickEditComment = async () => {
        setEditCommentInput(!editCommentInput)
    }

    const handleEditComment = async (id) => {
        const res = await editComment(id, editCommentValue, token)

        setComment(res.data)
        setEditCommentInput(false)

        return toast.success(res.message)
    }

    const onClickDeleteComment = async (id) => {
        const res = await deleteComments(id, token)
    
        setPostComments(Number(postComments) - 1);
    
        const updatedCommentsData = commentsData.filter(comment => comment.id !== id);
        
        setCommentsData(updatedCommentsData);
        
        return toast.success(res.message)
    }
    
    return (
        <div className='flex bg-gray-100 rounded-xl mb-2 p-4' key={comment.id}>
            <div className='w-1/12 flex items-center'>
                <Image 
                    className="w-8 rounded-full object-cover"
                    src={comment.profile_img ? api_url + comment.profile_img : profileImg}
                    width={512} height={512} alt="Profile"
                />
            </div>
            <div className={`w-10/12`}>
                <h4 className={`m-0 text-md`}>{comment.username}</h4>
                <p className={`m-0 text-sm text-gray-600 ${editCommentInput ? 'hidden' : ''}`}>{editCommentValue}</p>
                
                <div className='flex'>
                    <input type="text" defaultValue={comment.description} onChange={(e) => setEditComentValue(e.target.value)} className={`w-full px-3 py-1 mt-2 rounded-lg ${!editCommentInput ? 'hidden' : ''}`} placeholder="Write something ..." />

                    <div className='flex gap-2'>
                        <button className={`text-gray-500 ${!editCommentInput ? 'hidden' : 'ml-4'}`} onClick={() => handleEditComment(comment.id)}>
                            <Check size={24} />
                        </button>
                        <button className={`text-red-500 ${!editCommentInput ? 'hidden' : ''}`} onClick={() => setEditCommentInput(false)}>
                            <X size={24} />
                        </button>
                    </div>
                </div>
            </div>
            {userData && userData.id == comment.user_id ? 
                <div className={`w-1/12 flex gap-2 items-center justify-center ${editCommentInput ? 'hidden' : ''}`}>
                    <button className={`text-gray-500`} onClick={() => onClickEditComment(comment.id)}>
                        <PencilSimple size={24} />
                    </button>
                    <button className={`text-red-500`} onClick={() => onClickDeleteComment(comment.id)}>
                        <Trash size={24} />
                    </button>
                </div>
            : ''}
        </div>
    )
}

export default CommentItem