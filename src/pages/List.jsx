// src/pages/List.jsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CustomPagination from "../components/CustomPagination";

export default function List() {
  const { type } = useParams(); // "people" | "planets" | "vehicles"

  const base = `https://www.swapi.tech/api/${type}`;
  const [pageUrl, setPageUrl] = useState(base);

  const [items, setItems] = useState([]);
  const [info, setInfo] = useState({
    total_pages: 0,
    total_records: 0,
    next: null,
    previous: null,
  });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    setPageUrl(base);
  }, [type]); //

  useEffect(() => {
    let aborted = false;
    (async () => {
      setLoading(true);
      setErr("");
      try {
        const res = await fetch(pageUrl);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (aborted) return;
        setItems(Array.isArray(json.results) ? json.results : []);
        setInfo({
          total_pages: json.total_pages ?? 0,
          total_records: json.total_records ?? 0,
          next: json.next ?? null,
          previous: json.previous ?? null,
        });
      } catch (e) {
        if (!aborted) setErr(e.message || "Fetch failed");
      } finally {
        if (!aborted) setLoading(false);
      }
    })();
    return () => { aborted = true; };
  }, [pageUrl]); //

  return (
    <div className="container py-4 bg-dark min-vh-100">
      <div className="d-flex align-items-center justify-content-between text-white mb-3">
        <div>
          <h1 className="h4 m-0 text-capitalize">{type}</h1>
          <small className="text-muted">
            Total records: {info.total_records} · Total pages: {info.total_pages}
          </small>
        </div>
        <Link className="btn btn-outline-light btn-sm" to="/">← Back</Link>
      </div>

      <CustomPagination info={info} pageUrl={pageUrl} setPageUrl={setPageUrl} />

      {loading && <p className="text-white">Loading…</p>}
      {err && <p className="text-danger">Error: {err}</p>}
      {!loading && !err && items.length === 0 && (
        <p className="text-white">No results.</p>
      )}

      <div className="row g-3">
        {items.map((it) => (
          <div key={`${type}-${it.uid}`} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card bg-secondary text-white h-100 border-0">
              <img
                className="card-img-top"
                src={`https://picsum.photos/seed/${type}-${it.uid}/400/300`}
                alt={it.name}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{it.name}</h5>
                <div className="mt-auto">
                  <Link className="btn btn-outline-light btn-sm" to={`/details/${type}/${it.uid}`}>
                    Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CustomPagination info={info} pageUrl={pageUrl} setPageUrl={setPageUrl} />

      {/* <div className="mt-4 text-white-50 small">
        <div>next: <code>{info.next || "null"}</code></div>
        <div>previous: <code>{info.previous || "null"}</code></div>
      </div> */}
    </div>
  );
}
