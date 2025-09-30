export default function CustomPagination({ info, pageUrl, setPageUrl }) {
  const currentPage = (() => {
    try {
      const u = new URL(pageUrl);
      const p = Number(u.searchParams.get(page));
      return Number.isFinite(p) ? p : 1;
    } catch {
      return 1;
    }
  })();

  return (
    <div className="d-flex justify-content-between align-items-center my-3">
      <button
        className={"btn btn-info btn-sm " + (!info.previous ? "disabled" : "")}
        disabled={!info.previous}
        onClick={() => setPageUrl(info.previous)}
      >
        Prev
      </button>

      <span className="text-white-50 small">
        Page {currentPage} of {info.total_pages || "?"}
      </span>

      <button
        className={"btn btn-info btn-sm " + (!info.next ? "disabled" : "")}
        disabled={!info.next}
        onClick={() => setPageUrl(info.next)}
      >
        Next
      </button>
    </div>
  );
}
