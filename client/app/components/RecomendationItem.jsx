import React, { useContext, useState, useEffect } from 'react'
import { toast } from 'sonner'

import Image from "next/image"

import { TokenContext } from '../TokenContext'
import createFollow from '@/lib/follow/createFollow'

import profileImg from '@/public/assets/image/default.png'

function RecomendationItem({item}) {
    const api_url = process.env.NEXT_PUBLIC_API_STATIC;

    const {token, userData} = useContext(TokenContext)

    const onClickFollow = async (userFollowedId) => {
        const data = {
          userId: userData.id, 
          userFollowedId
        }
    
        const res = await createFollow(data, token)
        
        toast.success(res.message)
    }

    useEffect(() => {
        // if(userData) {
        //     onClickFollow(item.id)
        // }    
    }, [])

    return (
        <div className="flex flex-col mt-6">
            <div className="flex justify-between items-center">
            <div className="flex items-center">
                <Image className="w-10 h-10 object-cover" src={item && item.profile_img ? api_url + item.profile_img : profileImg} width={512} height={512} alt="" />
                <div className="flex flex-col ml-3">
                <h4 className="text-base">{item.name}</h4>
                <p className="text-xs">{item.role}</p>
                </div>  
            </div>
            <div className='ml-4'>
                <button type="button" onClick={() => onClickFollow(item.id)} className="py-2 px-4 text-sm border text-blue-500 border-blue-500 hover:text-white hover:bg-blue-500 rounded-lg">Follow</button>
            </div>
            </div> 
        </div>
    )
}

export default RecomendationItem