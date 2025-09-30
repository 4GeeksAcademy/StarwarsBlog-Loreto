// src/pages/Detail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import FavBtn from "../components/FavBtn"; // ← NEW

export default function Detail() {
  const { type, uid } = useParams();
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(`https://www.swapi.tech/api/${type}/${uid}`);
      const json = await res.json();
      setDetail(json.result ?? null);
    })();
  }, [type, uid]);

  if (!detail) {
    return <div className="container py-5 bg-dark text-white">Loading…</div>;
  }

  const props = detail.properties || {};

  const renderValue = (key, value) => {
    if (Array.isArray(value)) {
      if (value.length === 0) return "—";
      return (
        <div className="d-flex flex-wrap gap-2">
          {value.map((u, i) => {
            const s = String(u);
            const last = s.split("/").filter(Boolean).pop();
            const label =
              key === "films" && !Number.isNaN(Number(last))
                ? `Film ${last}`
                : (key.slice(0, 1).toUpperCase() + key.slice(1, 3));
            return (
              <a
                key={i}
                href={s}
                target="_blank"
                rel="noreferrer"
                className="badge bg-light text-dark text-decoration-none"
                title={s}
              >
                {label}
              </a>
            );
          })}
        </div>
      );
    }
    if (value === null || value === undefined || value === "") return "—";
    return <span className="break-anywhere">{String(value)}</span>;
  };

  return (
    <div className="container py-4 bg-dark min-vh-100 text-white">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="h4 m-0">{props.name}</h1>
        <div className="d-flex gap-2">
          {/* ← Add/Remove this item (any type) from favourites */}
          <FavBtn type={type} uid={uid} name={props.name} />
          <Link className="btn btn-outline-light btn-sm" to={`/list/${type}`}>
            Back to list
          </Link>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-md-5">
          <img
            className="img-fluid rounded w-100"
            src={`https://picsum.photos/300/300`}
            alt={props.name}
          />
        </div>

        <div className="col-12 col-md-7">
          <p className="text-muted">{detail.description || "No description."}</p>

          <div className="table-responsive">
            <table className="table table-dark table-striped table-borderless align-middle mb-0">
              <tbody>
                {Object.entries(props).map(([k, v]) => (
                  <tr key={k}>
                    <th className="text-capitalize" style={{ width: 220 }}>
                      {k.replaceAll("_", " ")}
                    </th>
                    <td className="break-anywhere">{renderValue(k, v)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}
