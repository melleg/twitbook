import { useSearchParams } from "react-router-dom";
import { useGlobalContext } from "../auth/GlobalContext";

interface PaginationProps {
  totalPages: number;
}
const PaginationControls: React.FC<PaginationProps> = ({ totalPages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { refresh, setRefresh } = useGlobalContext();

  const getPage = () => {
    if (!searchParams) console.error("No search params!");
    return parseInt(searchParams.get("page") ?? "0");
  };

  const setPage = (page: number) => {
    if (!searchParams) console.error("No search params!");
    setRefresh(refresh + 1);
    setSearchParams({ page: page.toString() });
  };

  const checkIfLastPage = () => {
    return getPage() === totalPages - 1;
  };

  const checkIfFirstPage = () => {
    return getPage() === 0;
  };

  return (
    <div className="flex justify-around">
      {checkIfFirstPage() ? <div></div> : (
        <button
          className="btn-action"
          onClick={() => {
            setPage(getPage() - 1);
          }}
        >
          Previous
        </button>
      )}
      <div>
        {checkIfFirstPage() ? <></> : (
          <button
            className="btn-action"
            onClick={() => {
              setPage(getPage() - 1);
            }}
          >
            {getPage()}
          </button>
        )}
        <button className="btn-action">{getPage() + 1}</button>
        {checkIfLastPage() ? <></> : (
          <button
            className="btn-action"
            onClick={() => {
              setPage(getPage() + 1);
            }}
          >
            {getPage() + 2}
          </button>
        )}
      </div>
      {checkIfLastPage() ? <div></div> : (
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
