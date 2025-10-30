'use client';

import Image from 'next/image';
import { ChevronDown, Search, Bell } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex items-center justify-between pb-8 ">
      <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
      
      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search for anything..."
            className="w-[240px] pl-10 pr-4 py-2 rounded-lg gray-300 text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
          />
        </div>

        {/* Notification Bell */}   
        <button className="w-9 h-9 rounded-lg bg-white flex items-center justify-center hover:bg-gray-50">
          <Bell className="w-4 h-4 text-gray-600" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 rounded-lg pl-1.5 pr-3 py-1.5  bg-white hover:bg-gray-50 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
            <Image
              src="/logo.svg"
              alt="User"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-900">Alex rmain</span>
            <span className="text-[10px] text-gray-500">Product manager</span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
        </div>
      </div>
    </header>
  );
}
