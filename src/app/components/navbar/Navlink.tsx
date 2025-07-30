'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface NavLinkProps {
  href: string;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href}
      className={`px-4 py-2 rounded-md text-2xl font-medium transition-colors duration-200 ${
        isActive
          ? 'text-blue-600 bg-blue-100'
          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
      }`}
    >
      {label}
    </Link>
  );
};

export default NavLink;
