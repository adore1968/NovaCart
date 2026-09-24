type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  variant?: string;
};

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  variant = "dark",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="d-flex justify-content-center gap-2 mt-5">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={`btn ${
            currentPage === index + 1
              ? `btn-${variant}`
              : `btn-outline-${variant}`
          }`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
