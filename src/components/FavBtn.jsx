import { useFavs } from "../hooks/favs";

export default function FavBtn({ type, uid, name, className = "", size="sm" }) {
  const { favs, toggle } = useFavs();
  const is = favs.some(f => f.type===type && String(f.uid)===String(uid));
  return (
    <button
      className={`btn ${is ? "btn-warning" : "btn-outline-light"} btn-${size} ${className}`}
      onClick={() => toggle({ type, uid, name })}
      aria-pressed={is}
      title={is ? "Remove from favourites" : "Add to favourites"}
    >
      {is ? "Saved" : "Save"}
    </button>
  );
}
