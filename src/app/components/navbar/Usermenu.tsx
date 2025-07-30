"use client";

import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface UserMenuProps {
  user: {
    name?: string;
    email?: string;
    image?: string;
  };
}

export default function Usermenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setIsOpen((prev) => !prev)} className="focus:outline-none">
      <img
  src={user.image || "/images/user.png"}
  alt="Profile"
  className="w-10 h-10 rounded-full border-2 border-white"
/>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
          <div className="px-4 py-2 font-medium border-b">{user.name || user.email}</div>
          <Link
            href="/profile/edit"
            className="block px-4 py-2 hover:bg-gray-100 transition"
          >
            Edit Profile
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
