const SongCard = ({ song, isActive, onClick }) => {
  return (
    <div
      className={`flex items-center p-4 rounded cursor-pointer ${
        isActive
          ? "bg-red-600 border-l-8 border-red-400 text-white"
          : "hover:bg-gray-600 text-gray-400 font-bold"
      }`}
      onClick={() => onClick(song)}
    >
      {/* Song ID and Image */}
      <div className="flex items-center gap-4 w-1/4">
        <p className="w-6 text-center">{song.id}</p>
        <img
          src={song.image}
          alt={song.title}
          className="w-12 h-12 rounded object-cover"
        />
      </div>

      {/* Song Title */}
      <div className="flex-1">
        <p
          className={`font-semibold ${
            isActive ? "text-white" : "text-gray-200"
          }`}
        >
          {song.title}
        </p>
      </div>

      {/* Song Duration */}
      <div className="w-20 text-start">
        <p className={`${isActive ? "text-white" : "text-gray-200"}`}>
          {song.duration}
        </p>
      </div>

      {/* Song Album */}
      <div className="w-1/3">
        <p
          className={`text-sm truncate ${
            isActive ? "text-white" : "text-gray-200"
          }`}
        >
          {song.album}
        </p>
      </div>
    </div>
  );
};

export default SongCard;
