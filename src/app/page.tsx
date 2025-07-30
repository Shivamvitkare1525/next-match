import { auth, signOut } from '@/auth'
import Link from 'next/link'
import React from 'react'
import { FaRegSmile } from 'react-icons/fa'

export default  async function Page() {
const session= await auth()
console.log(session);

  return (
      <div>
        <h3>Session : </h3>
        {
          session ?(<div>{JSON.stringify(session,null,2)} 
          <form action={async ()=>{
            'use server'
            await signOut()
          }}>
    <button 
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition duration-200"
      >
        <FaRegSmile className="text-lg" />
        Sign Out
      </button>
          </form>
          </div>):(<div>No Sign un</div>)
        }
    
      </div>
    
  )
}
