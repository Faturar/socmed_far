import React from 'react'

import Image from "next/image"

import { suggestions } from '../data'

function RightSide() {
  return (
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
  )
}

export default RightSide