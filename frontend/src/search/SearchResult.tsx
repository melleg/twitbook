import { useState } from "react";
import { useParams } from "react-router-dom";
import { getUsers } from "../user/user-service";
import User from "../user/user";

const SearchResult: React.FC = () => {
  const { id } = useParams();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<User[]>([]);

  const searchHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(id!);
    const res = await getUsers();
    setResults(res.filter((User) => User.displayName.includes?.(search)));
  };

  return (
    <span className="my-2 py-2 pl-4 pr-4 glass rounded-lg text-left text-light">
      {results.map((User) => User.displayName)}
    </span>
  );
};

export default SearchResult;
