import { useState } from "react";
import { getUsers } from "../user/user-service";
import User from "../user/user";

const SearchBar: React.FC = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<User[]>([]);

  const searchHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await getUsers();
    console.log(res);
    setResults(res.filter((User) => User.displayName.includes?.(search)));
    console.log(res.filter((User) => User.displayName.includes?.(search)));
  };

  return (
    <>
      <form onSubmit={searchHandler}>
        <input
          type="textarea"
          placeholder="Search for a user"
          className="my-2 py-2 text-light"
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <button className="btn-action" type="submit">
          Search
        </button>
      </form>
      <span className="my-2 py-2 pl-4 pr-4 glass rounded-lg text-left text-light">
        {results.map((User) => User.displayName)}
      </span>
    </>
  );
};

export default SearchBar;
