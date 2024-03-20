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
    setRefresh(refresh + 1);
  };

  return (
    <>
      <form onSubmit={searchHandler} className="flex gap-1 flex-grow py-1">
        <input
          type="textarea"
          placeholder="Search for user or #hashtag"
          className="w-0 flex-grow flex-shrink py-1 glass rounded-lg text-left text-light"
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <button className="btn-action" type="submit">
          Search
        </button>
      </form>
    </>
  );
};

export default SearchBar;
