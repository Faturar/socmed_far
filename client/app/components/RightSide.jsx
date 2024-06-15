import React, { useContext, useEffect, useState } from 'react'

import { TokenContext } from '../TokenContext'
import getAllUserRecomendations from '@/lib/users/getAllUserRecomendations'

import RecomendationItem from './RecomendationItem'

function RightSide() {
  const {login, token} = useContext(TokenContext)

  const [recomendations, setRecomendations] = useState([])

  const getRecomendations = async () => {
    const res = await getAllUserRecomendations(token)

    setRecomendations(res.data)
  }

  useEffect(() => {
    if(login) {
      getRecomendations();
    }
  }, [])

  return (
    <div className="hidden lg:flex lg:w-1/4 pl-2">
      <div className={`w-full relative ${!login ? 'hidden' : ''}`}>
        <div className="sticky top-12 flex flex-col bg-white px-6 py-6 mb-6 drop-shadow-sm rounded-2xl overflow-hidden text-gray-600">
            <h2 className="text-xl">Suggestion for you:</h2>

            {/* Suggestion item */}
            {recomendations.map((item, index) => (
              <RecomendationItem key={index} item={item} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default RightSide