import { useSearchParams } from "react-router-dom";
interface PaginationProps {
  totalPages: number;
}
const PaginationControls: React.FC<PaginationProps> = ({ totalPages }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getPage = () => {
    if (!searchParams) console.error("No search params!");
    return parseInt(searchParams.get("page") ?? "0");
  };

  const setPage = (page: number) => {
    if (!searchParams) console.error("No search params!");
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };

  const checkIfLastPage = () => getPage() === totalPages - 1;
  const checkIfFirstPage = () => getPage() === 0;

  const PageButton = (props: { page: number; text: string }) => {
    return (
      <button
        className="btn-action"
        onClick={() => {
          setPage(props.page);
        }}
      >
        {props.text}
      </button>
    );
  };

  return (
    <div className="max-w-xl mx-auto flex flex-wrap justify-center gap-6 mb-2">
      <div className="flex-grow basis-0">
        {!checkIfFirstPage() && (
          <PageButton page={getPage() - 1} text="Previous" />
        )}
      </div>
      <div className="flex gap-1 ml-auto mr-auto">
        <div className="w-10">
          {!checkIfFirstPage() && (
            <PageButton page={getPage() - 1} text={getPage().toString()} />
          )}
        </div>

        <div className="w-10">
          <PageButton page={getPage()} text={(getPage() + 1).toString()} />
        </div>

        <div className="w-10">
          {!checkIfLastPage() && (
            <PageButton
              page={getPage() + 1}
              text={(getPage() + 2).toString()}
            />
          )}
        </div>
      </div>
      <div className="flex-grow basis-0 flex justify-end">
        {!checkIfLastPage() && <PageButton page={getPage() + 1} text="Next" />}
      </div>
    </div>
  );
};

export default PaginationControls;
