import css from './Pagination.module.css';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className={css.pagination}>
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className={css.button}
      >
        Previous
      </button>
      <span className={css.pageInfo}>
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className={css.button}
      >
        Next
      </button>
    </div>
  );
}