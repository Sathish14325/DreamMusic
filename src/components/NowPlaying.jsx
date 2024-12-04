import { Howl } from "howler";
import { useState, useEffect, useRef } from "react";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaRandom,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";

const NowPlaying = ({ currentSong, playlist = [] }) => {
  const soundRef = useRef(null); // Ref to store the Howl instance
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isVisible, setIsVisible] = useState(true); // To toggle visibility
  const [isRepeat, setIsRepeat] = useState(false); // Repeat mode
  const [currentIndex, setCurrentIndex] = useState(0); // Current song index

  // Initialize or update the Howl instance when `currentSong` changes
  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.stop(); // Stop the previous song
    }

    // Create a new Howl instance for the current song
    soundRef.current = new Howl({
      src: [currentSong.url],
      html5: true, // Ensure compatibility with modern browsers
      loop: isRepeat, // Loop if repeat mode is enabled
      onend: () => {
        if (!isRepeat) playNextSong(); // Play next song if not repeating
      },
      onplay: () => {
        requestAnimationFrame(updateTime);
      },
    });

    setIsPlaying(false); // Reset the play state when the song changes
    setCurrentTime(0); // Reset the time
  }, [currentSong, isRepeat]);

  const updateTime = () => {
    if (soundRef.current && soundRef.current.playing()) {
      setCurrentTime(soundRef.current.seek());
      requestAnimationFrame(updateTime);
    }
  };

  const togglePlay = () => {
    if (!soundRef.current) return;

    if (isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const seekBackward = () => {
    if (soundRef.current) {
      const newTime = Math.max(soundRef.current.seek() - 5, 0);
      soundRef.current.seek(newTime);
      setCurrentTime(newTime);
    }
  };

  const seekForward = () => {
    if (soundRef.current) {
      const newTime = Math.min(
        soundRef.current.seek() + 5,
        soundRef.current.duration()
      );
      soundRef.current.seek(newTime);
      setCurrentTime(newTime);
    }
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  const playNextSong = () => {
    let nextIndex = (currentIndex + 1) % playlist.length;
    setCurrentIndex(nextIndex);
  };

  const playRandomSong = () => {
    let randomIndex = Math.floor(Math.random() * playlist.length);
    if (randomIndex === currentIndex) {
      randomIndex = (randomIndex + 1) % playlist.length;
    }
    setCurrentIndex(randomIndex);
  };

  // Effect to update current song when index changes
  useEffect(() => {
    if (playlist.length > 0) {
      const nextSong = playlist[currentIndex];
      nextSong && nextSong.url && playNewSong(nextSong);
    }
  }, [currentIndex]);

  const playNewSong = (song) => {
    if (soundRef.current) {
      soundRef.current.stop();
    }
    soundRef.current = new Howl({
      src: [song.url],
      html5: true,
      loop: isRepeat,
      onend: () => {
        if (!isRepeat) playNextSong();
      },
    });
    setIsPlaying(false);
    setCurrentTime(0);
  };

  return (
    <div
      className={`${
        isVisible ? "h-auto" : "h-12"
      } bg-red-700 p-5 rounded-lg text-white w-96 md:w-80 fixed bottom-0 md:bottom-5 md:right-5 shadow-lg transition-all duration-300 overflow-hidden`}
    >
      {/* Toggle Icon */}
      <div
        className="flex justify-center items-center cursor-pointer text-lg mb-2"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? <FaChevronDown /> : <FaChevronUp />}
      </div>

      {isVisible && (
        <>
          <div className="text-center mb-4">
            <h3 className="text-sm uppercase text-white font-bold">
              Now Playing
            </h3>
          </div>
          <div className="relative overflow-hidden rounded-md">
            <img
              src={currentSong.image}
              alt={currentSong.title}
              className="object-cover w-full h-48"
            />
          </div>
          <h2 className="font-bold text-center mt-3 text-lg">
            {currentSong.title}
          </h2>
          <p className="text-center text-gray-300 text-sm">
            {currentSong.album}
          </p>
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-gray-300">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min="0"
              max={soundRef.current ? soundRef.current.duration() || 0 : 0}
              value={currentTime}
              onChange={(e) => {
                if (soundRef.current) {
                  const seekValue = parseFloat(e.target.value);
                  soundRef.current.seek(seekValue);
                  setCurrentTime(seekValue);
                }
              }}
              className="flex-1 mx-3"
            />
            <span className="text-sm text-gray-300">
              {soundRef.current
                ? formatTime(soundRef.current.duration() || 0)
                : "0:00"}
            </span>
          </div>
          <div className="flex items-center justify-between mt-4">
            <FaRepeat
              className={`cursor-pointer ${isRepeat ? "text-green-500" : ""}`}
              onClick={toggleRepeat}
            />
            <FaStepBackward onClick={seekBackward} className="cursor-pointer" />
            {isPlaying ? (
              <FaPause onClick={togglePlay} className="cursor-pointer" />
            ) : (
              <FaPlay onClick={togglePlay} className="cursor-pointer" />
            )}
            <FaStepForward onClick={seekForward} className="cursor-pointer" />
            <FaRandom onClick={playRandomSong} className="cursor-pointer" />
          </div>
        </>
      )}
    </div>
  );
};

// Helper function to format time
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default NowPlaying;
