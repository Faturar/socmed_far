import React, { useContext, useEffect, useState } from 'react'

import Image from "next/image"

import { TokenContext } from '../TokenContext'
import getAllUserRecomendations from '@/lib/users/getAllUserRecomendations'

function RightSide() {
  const api_url = process.env.NEXT_PUBLIC_API_STATIC;

  const {login, token} = useContext(TokenContext)

  const [recomendations, setRecomendations] = useState([])

  const getRecomendations = async () => {
    const res = await getAllUserRecomendations(token)
    console.log(res.data)
    setRecomendations(res.data)
  }

  useEffect(() => {
    getRecomendations();
  }, [])

  return (
    <div className="hidden lg:flex lg:w-1/4 pl-2">
      <div className={`w-full relative ${!login ? 'hidden' : ''}`}>
        <div className="sticky top-12 flex flex-col bg-white px-6 py-6 mb-6 drop-shadow-sm rounded-2xl overflow-hidden text-gray-600">
            <h2 className="text-xl">Suggestion for you:</h2>

            {/* Suggestion item */}
            {recomendations.map((item, index) => (
              <div key={index} className="flex flex-col mt-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Image className="w-10 h-10 object-cover" src={api_url + item.profile_img} width={512} height={512} alt="" />
                        <div className="flex flex-col ml-3">
                        <h4 className="text-base">{item.name}</h4>
                        <p className="text-xs">{item.role}</p>
                        </div>
                    </div>
                    <div className='ml-4'>
                        <button type="button" className="py-2 px-4 text-sm border text-blue-500 border-blue-500 hover:text-white hover:bg-blue-500 rounded-lg">Follow</button>
                    </div>
                  </div> 
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default RightSide