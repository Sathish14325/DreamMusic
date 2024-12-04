import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import SongCard from "./SongCard";

const SortableSongCard = ({ song, isActive, onClick }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: song.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <SongCard song={song} isActive={isActive} onClick={onClick} />
      </div>
    </>
  );
};

export default SortableSongCard;
