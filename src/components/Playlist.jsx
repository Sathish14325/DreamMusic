import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableSongCard from "./SortableSongCard";

const Playlist = ({ songs, setSongs, currentSong, setCurrentSong }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag-and-drop event
  const handleDragEnd = (event) => {
    // console.log("Active:", event.active);
    // console.log("Over:", event.over);

    const { active, over } = event;

    // Ensure the `over` item exists before proceeding
    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = songs.findIndex((song) => song.id === active.id);
    const newIndex = songs.findIndex((song) => song.id === over.id);

    // Reorder the songs array using `arrayMove`
    const reorderedSongs = arrayMove(songs, oldIndex, newIndex);
    setSongs(reorderedSongs);
  };

  // console.log("Songs array:", songs);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <table className="my-5">
        <thead>
          <tr className="border-b border-gray-700 uppercase">
            <th className="py-2 px-4 w-12">#</th>
            <th className="py-2 px-4 w-16">Image</th>
            <th className="py-2 px-4">Title</th>
            <th className="py-2 px-4 w-20">Duration</th>
            <th className="py-2 px-4">Album</th>
          </tr>
        </thead>
      </table>
      {/* Use only `id` values for `items` */}
      <SortableContext
        items={songs ? songs.map((song) => song.id) : []}
        strategy={verticalListSortingStrategy}
      >
        <div className="mt-5">
          {songs &&
            songs.map((song) => {
              if (!song || !song.id) {
                console.error("Invalid song data:", song);
                return null; // Skip invalid entries
              }
              return (
                <SortableSongCard
                  key={song.id}
                  song={song}
                  isActive={currentSong.id === song.id}
                  onClick={setCurrentSong}
                />
              );
            })}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default Playlist;
