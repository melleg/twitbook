import { useSearchParams } from "react-router-dom";
interface PaginationProps {
    totalPages: number;
  }
const PaginationControls: React.FC<PaginationProps> = ( {totalPages} ) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getPage = () => {
    if (!searchParams) console.error("No search params!");
    return parseInt(searchParams.get("page") ?? "0");
  };

  const setPage = (page: number) => {
    if (!searchParams) console.error("No search params!");
    setSearchParams({ page: page.toString() });
  };

  return (
    <div className="flex justify-around">
      {getPage() !== 0 && (
        <button
          className="btn-action"
          onClick={() => {
            setPage(getPage() - 1);
          }}
        >
          Previous
        </button>
      )}
      {(getPage() < totalPages - 1 || totalPages === 0) && (
        <button
          className="btn-action"
          onClick={() => {
            setPage(getPage() + 1);
          }}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default PaginationControls;
