import Link from 'next/link';
import React from 'react';
import NavLink from './Navlink';
import { auth } from '@/auth';
import Usermenu from './Usermenu';

export default  async function Topnav() {
  const session=await auth()
  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-gradient-to-r from-blue-800 to-purple-500">
      {/* Logo */}
      <div className="text-4xl font-extrabold text-white tracking-wide">MyLogo</div>

      {/* Nav Links */}
      <div className="hidden md:flex gap-8 text-white text-xl font-semibold">
        <NavLink href="/members" label="Matches" />
        <NavLink href="/list" label="List" />   
        <NavLink href="/message" label="Message" />
      </div>

      {/* Buttons */}

      {
        session?.user? (<Usermenu user={session.user}/>):(<>
             <div className="flex gap-4">
        <Link href="/login">
          <button className="px-5 py-2 border border-white text-white text-lg rounded-md hover:bg-white hover:text-pink-600 transition font-medium">
            Login
          </button>
        </Link>
        <Link href="/register">
          <button className="px-5 py-2 bg-white text-purple-700 text-lg rounded-md font-semibold hover:bg-purple-100 transition">
            Register
          </button>
        </Link>
      </div>
          </>)
      }
   
    </nav>
  );
}
