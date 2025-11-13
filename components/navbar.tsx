'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/company/${searchQuery}`);
    }
  };

  return (
    <nav className="w-full fixed top-0 z-50 bg-black border-b border-white/5 ">
      <div className="max-w-7xl mx-auto flex items-center px-6 py-3">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-tight">
          <span className="text-white">Bull</span>
          <span className="text-blue-500">Verse.ai</span>
        </div>

        {/* Center Search Bar */}
        <div className="flex-1 flex justify-center px-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search stocks..."
            className="w-[420px] px-4 py-2 rounded-xl bg-white/5 text-white
                       border border-white/10 placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-blue-500/60"
          />
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-5">

          <button className="text-gray-300 hover:text-white transition">
            Docs
          </button>

          <button className="text-gray-300 hover:text-white transition">
            Login
          </button>

          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 
                             text-white rounded-lg transition">
            Sign Up
          </button>

        </div>
      </div>
    </nav>
  );
}
