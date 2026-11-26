import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

function Pagination({
  page,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const start = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;

  const end = Math.min(page * pageSize, totalItems);

  const firstVisiblePage = Math.max(1, Math.min(page - 2, totalPages - 4));

  const lastVisiblePage = Math.min(totalPages, firstVisiblePage + 4);

  const visiblePages = Array.from(
    {
      length: lastVisiblePage - firstVisiblePage + 1,
    },
    (_, index) => firstVisiblePage + index,
  );

  return (
    <div className="pagination">
      <span className="pagination-info">
        Showing {start}–{end} of {totalItems}
      </span>

      <div className="pagination-controls">
        {onPageSizeChange && (
          <select
            className="pagination-size"
            value={pageSize}
            aria-label="Rows per page"
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
          >
            <option value={5}>5 / page</option>
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
            <option value={50}>50 / page</option>
          </select>
        )}

        <button
          type="button"
          className="pagination-button"
          disabled={page <= 1}
          aria-label="Previous page"
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft size={18} />
        </button>

        {visiblePages.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            aria-current={page === pageNumber ? "page" : undefined}
            className={`pagination-button ${
              page === pageNumber ? "pagination-active" : ""
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}

        <button
          type="button"
          className="pagination-button"
          disabled={page >= totalPages}
          aria-label="Next page"
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
