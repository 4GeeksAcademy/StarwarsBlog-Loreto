import { Link } from "react-router-dom";
import { useFavs } from "../hooks/favs";

export default function Favourites() {
  const { favs, clear, remove } = useFavs();

  return (
    <div className="container py-4 bg-dark min-vh-100">
      <div className="d-flex align-items-center justify-content-between text-white mb-3">
        <div>
          <h1 className="h4 m-0">Favourites</h1>
          <small className="text-muted">Saved items: {favs.length}</small>
        </div>
        <div className="d-flex gap-2">
          <Link className="btn btn-outline-light btn-sm" to="/">← Back</Link>
          {favs.length > 0 && (
            <button className="btn btn-outline-danger btn-sm" onClick={clear}>
              Clear all
            </button>
          )}
        </div>
      </div>

      {favs.length === 0 ? (
        <p className="text-white-50">No favourites yet. Open any item and press “Save”.</p>
      ) : (
        <div className="row g-3">
          {favs.map((it) => (
            <div key={`${it.type}-${it.uid}`} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card bg-secondary text-white h-100 border-0">
                <img
                  className="card-img-top"
                  src={`https://picsum.photos/seed/${it.type}-${it.uid}/400/300`}
                  alt={it.name}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{it.name}</h5>
                  <p className="text-white-50 text-capitalize mb-2">{it.type}</p>

                  <div className="mt-auto d-flex gap-2">
                    <Link
                      className="btn btn-outline-light btn-sm"
                      to={`/details/${it.type}/${it.uid}`}
                    >
                      Details
                    </Link>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => remove(it)}
                      title="Remove from favourites"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
