import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";
import { Howl } from "howler";
import { useState } from "react";

const Controls = ({ currentSong, onNext, onPrevious }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);

  // Handle play/pause
  const togglePlayPause = () => {
    if (!sound) {
      const newSound = new Howl({ src: [currentSong.url], html5: true });
      setSound(newSound);
      newSound.play();
    } else {
      if (isPlaying) {
        sound.pause();
      } else {
        sound.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  // Play next or previous track
  const handleTrackChange = (direction) => {
    if (sound) sound.stop();
    direction === "next" ? onNext() : onPrevious();
    setIsPlaying(false);
    setSound(null);
  };

  return (
    <div className="flex items-center justify-between mt-4 text-white space-x-5">
      <FaStepBackward
        className="text-2xl cursor-pointer hover:text-gray-400"
        onClick={() => handleTrackChange("previous")}
      />
      {isPlaying ? (
        <FaPause
          className="text-3xl cursor-pointer hover:text-gray-400"
          onClick={togglePlayPause}
        />
      ) : (
        <FaPlay
          className="text-3xl cursor-pointer hover:text-gray-400"
          onClick={togglePlayPause}
        />
      )}
      <FaStepForward
        className="text-2xl cursor-pointer hover:text-gray-400"
        onClick={() => handleTrackChange("next")}
      />
    </div>
  );
};

export default Controls;
