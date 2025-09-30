// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useFavs } from "../hooks/favs";

export default function Navbar() {
  const { favs } = useFavs();
  const favCount = favs?.length ?? 0;

  return (
    <nav className="navbar navbar-expand bg-dark border-bottom border-secondary" data-bs-theme="dark">
      <div className="container">
        {/* Left: Star Wars logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg"
            alt="Star Wars"
            height="28"
          />
          <span className="d-none d-sm-inline text-white-50">Databank</span>
        </Link>

        {/* Right: Favourites button */}
        <div className="ms-auto">
          <Link
            to="/favourites"
            className={`btn btn-${favCount > 0 ? "warning" : "outline-warning"} btn-sm d-inline-flex align-items-center gap-2`}
          >
            <span>Favourites</span>
            {favCount > 0 && <span className="badge text-bg-light text-dark">{favCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
}
