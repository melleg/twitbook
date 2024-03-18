import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar: React.FC = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const searchHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    {search ? (navigate(`search/${search}`)) : (<></>)};
  };

  return (
    <>
      <form onSubmit={searchHandler}>
        <input
          type="textarea"
          placeholder="Search for a user"
          className="mt-2 py-1 glass rounded-lg text-left text-light"
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
