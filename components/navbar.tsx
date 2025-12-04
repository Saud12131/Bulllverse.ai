'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
export default function Navbar() {
  const {user , isLoading} = useUser()
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch results on typing (debounced)
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const timeout = setTimeout(async () => {
      const res = await fetch(`/api/company/${searchQuery}`);
      const data = await res.json();
      setResults(data);
      setShowDropdown(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const handleSelect = (symbol: string) => {
    router.push(`/company/${symbol}`);
    setSearchQuery('');
    setResults([]);
    setShowDropdown(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      handleSelect(searchQuery.trim());
    }
  };

    
  return (
    <nav className="w-full fixed top-0 z-50 bg-black border-b border-white/5 ">
      <div className="max-w-7xl mx-auto flex items-center px-6 py-3">
        
        {/* Logo */}
        <div className="text-2xl font-bold tracking-tight cursor-pointer" onClick={() => router.push('/')}>
          <span className="text-white">Bull</span>
          <span className="text-blue-500">Verse.ai</span>
        </div>

        {/* Center Search Bar */}
        <div className="flex-1 flex justify-center px-6 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Search stocks..."
            className="w-[420px] px-4 py-2 rounded-xl bg-white/5 text-white
                       border border-white/10 placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-blue-500/60"
            onFocus={() => searchQuery && setShowDropdown(true)}
          />

          {/* Autocomplete Dropdown */}
          {showDropdown && results.length > 0 && (
            <ul className="absolute top-12 w-[420px] bg-black border border-white/10 rounded-xl shadow-lg max-h-64 overflow-y-auto">
              {results.map((item: any) => (
                <li
                  key={item.symbol}
                  className="px-4 py-2 text-white hover:bg-white/10 cursor-pointer"
                  onClick={() => handleSelect(item.symbol)}
                >
                  <span className="font-semibold">{item.symbol}</span>
                  <span className="text-gray-400 ml-2">{item.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right Buttons */}
        <div className="flex items-center gap-5">
          <button className="text-gray-300 hover:text-white transition">Docs</button>
          {
            user && user.name ? (
              <button 
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition" 
                onClick={() => router.push("/profile")}
              >
                {user.name}
              </button>
            ) : (
              <button 
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition" 
                onClick={() => router.push("/auth/login")}
              >
                Login
              </button>
            )
          }
            <button 
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition" 
                onClick={() => router.push("/auth/logout")}
              >
                Logout
              </button>
        </div>
      </div>
    </nav>
  );
}
