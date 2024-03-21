import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../auth/GlobalContext";

const SearchBar: React.FC = () => {
  const { refresh, setRefresh } = useGlobalContext();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const searchHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!search || search.length === 0) return;
    navigate(
      search.startsWith("#")
        ? `search?h=${search.slice(1)}`
        : `search?q=${search}`
    );
    setSearch("");
    setRefresh(refresh + 1);
  };

  return (
    <>
      <form
        onSubmit={searchHandler}
        className="search-bar flex basis-72 text-lg gap-1 w-full py-1"
      >
        <input
          type="textarea"
          placeholder="Search user or #hashtag..."
          value={search}
          className="w-0 flex-grow flex-shrink search-input"
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <button
          className="btn-transparent basis-10 inline-flex items-center justify-center"
          type="submit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
            fill="#aaff16"
          >
            <path d="M782.87-98.52 526.913-354.478q-29.435 21.739-68.152 34.608-38.718 12.87-83.283 12.87-114.087 0-193.544-79.457Q102.477-465.913 102.477-580q0-114.087 79.457-193.544 79.457-79.457 193.544-79.457 114.087 0 193.544 79.457Q648.479-694.087 648.479-580q0 45.13-12.87 83.283-12.869 38.152-34.608 67.021l256.522 257.087-74.653 74.088ZM375.478-413.002q69.913 0 118.456-48.543Q542.477-510.087 542.477-580q0-69.913-48.543-118.456-48.543-48.543-118.456-48.543-69.913 0-118.456 48.543Q208.479-649.913 208.479-580q0 69.913 48.543 118.456 48.543 48.543 118.456 48.543Z" />
          </svg>
        </button>
      </form>
    </>
  );
};

export default SearchBar;
