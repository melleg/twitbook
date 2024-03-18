import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const PaginationControls = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState<number>(0);

  const getPage = () => {
    if (!searchParams) console.error("No search params!");
    return parseInt(searchParams.get("page") ?? "0");
  };

  const setPage = (page: number) => {
    console.log("Attemptong to set page");
    if (!searchParams) console.error("No search params!");
    setSearchParams({ page: page.toString() });
    console.log(searchParams);
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
