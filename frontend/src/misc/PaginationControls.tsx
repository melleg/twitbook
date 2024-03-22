import { useSearchParams } from "react-router-dom";
interface PaginationProps {
  totalPages: number;
}
const PaginationControls: React.FC<PaginationProps> = ({ totalPages }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const checkIfLastPage = () => getPage() === totalPages - 1;
  const checkIfFirstPage = () => getPage() === 0;
  const getPage = () => parseInt(searchParams.get("page") ?? "0");

  const setPage = (page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };

  const PageButton = (props: {
    page: number;
    text: string;
    className?: string;
    disabled?: boolean;
  }) => {
    return (
      <button
        className={`${props.className ?? ""}`}
        onClick={() => {
          setPage(props.page);
        }}
        disabled={props.disabled}
      >
        {props.text}
      </button>
    );
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-2">
      <div className="flex-grow basis-0 flex justify-end">
        <PageButton
          page={getPage() - 1}
          text="❮"
          disabled={checkIfFirstPage()}
          className="btn-transparent"
        />
      </div>
      <div className="flex gap-1">
        <PageButton
          page={getPage() - 1}
          text={getPage().toString()}
          disabled={checkIfFirstPage()}
          className="btn-action"
        />

        <PageButton
          page={getPage()}
          text={(getPage() + 1).toString()}
          className="btn-action activated"
        />

        <PageButton
          page={getPage() + 1}
          text={(getPage() + 2).toString()}
          disabled={checkIfLastPage()}
          className="btn-action"
        />
      </div>
      <div className="flex-grow basis-0 flex justify-start">
        <PageButton
          page={getPage() + 1}
          text="❯"
          disabled={checkIfLastPage()}
          className="btn-transparent"
        />
      </div>
    </div>
  );
};

export default PaginationControls;
