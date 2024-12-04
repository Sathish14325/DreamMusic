import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import Playlist from "./components/Playlist";
import NowPlaying from "./components/NowPlaying";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import songsList from "./utils/songs";
import Header from "./components/Header";

const App = () => {
  const [songs, setSongs] = useState(songsList);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [filteredSongs, setFilteredSongs] = useState([]);

  const handleSetSongs = (updatedSongs) => {
    setSongs(updatedSongs);
    if (!updatedSongs.find((song) => song.id === currentSong.id)) {
      setCurrentSong(updatedSongs[0]);
    }
  };

  const handleSearchResults = (results) => {
    setFilteredSongs(results);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full"
        } fixed md:relative z-40 md:translate-x-0 transition-transform duration-300 ease-in-out md:block w-64 h-full bg-black`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gradient-to-b from-red-900 to-gray-900 text-white">
        {/* Header */}
        <Header songs={songsList} onSearch={handleSearchResults} />
        <Main />
        {/* Playlist Section */}
        <div className="p-5 flex-1 flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Popular</h2>
          <Playlist
            songs={songs}
            setSongs={handleSetSongs}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
          />
        </div>

        {/* Now Playing Section */}
        <div className="p-5">
          {/* For small screens */}
          <div className="block md:hidden">
            <NowPlaying currentSong={currentSong} />
          </div>

          {/* For large screens */}
          <div className="hidden md:block fixed bottom-5 right-5">
            <NowPlaying currentSong={currentSong} />
          </div>
        </div>
      </div>

      {/* Sidebar Toggle Button for small screens */}
      <button
        className="fixed top-5 left-5 bg-gray-800 p-2 rounded-md text-white z-50 md:hidden"
        onClick={() => setSidebarVisible(!isSidebarVisible)}
      >
        {isSidebarVisible ? <FaArrowLeft /> : <FaArrowRight />}
      </button>
    </div>
  );
};

export default App;
