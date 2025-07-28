import Link from 'next/link';
import React from 'react';
import NavLink from './Navlink';

export default function Topnav() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
      <div className="text-xl font-bold text-blue-600">MyLogo</div>

      <div className="hidden md:flex gap-6 text-gray-700 font-medium">
        <NavLink href="/members" label="Matches" />
                <NavLink href="/list" label="List" />

        <NavLink href="/message" label="Message" />

        
       
        
      </div>

      <div className="flex gap-4">
        <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition">
          <Link href="/login">
          Login
          </Link>
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            <Link href="/register">
          Register
          </Link>
        </button>
      </div>
    </nav>
  );
}
