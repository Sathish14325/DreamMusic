import React, { useState } from "react";

const Header = ({ songs, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filteredSongs = songs.filter((song) =>
      song.title.toLowerCase().includes(term.toLowerCase())
    );
    onSearch(filteredSongs); // Pass filtered songs to the parent or another component
  };

  return (
    <div className="flex justify-around items-center p-4 text-white">
      {/* Navigation Links */}
      <nav className="flex gap-6 text-lg">
        <a href="#music" className="hover:text-gray-300">
          Music
        </a>
        <a href="#podcast" className="hover:text-gray-300">
          Podcast
        </a>
        <a href="#live" className="hover:text-gray-300">
          Live
        </a>
        <a href="#radio" className="hover:text-gray-300">
          Radio
        </a>
      </nav>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search..."
          className="bg-red-950 opacity-60 text-white px-4 py-2 rounded-full focus:outline-none w-64"
        />
        <button className="absolute top-0 right-3 h-full text-white">🔍</button>
      </div>
    </div>
  );
};

export default Header;
