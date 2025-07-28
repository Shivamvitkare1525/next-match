import Link from 'next/link'
import React from 'react'
import { FaRegSmile } from 'react-icons/fa'

export default function Page() {
  return (
      <button 
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition duration-200"
      >
        <FaRegSmile className="text-lg" />
        <Link href="">
        Click
        </Link>
      </button>
    
  )
}
