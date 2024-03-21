import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getUsers } from "../user/user-service";
import User from "../user/user";
import { useGlobalContext } from "../auth/GlobalContext";
import { format } from "date-fns";
import UserCard from "../user/UserCard";

const SearchResult: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { refresh } = useGlobalContext();
  const [results, setResults] = useState<User[]>([]);

  useEffect(() => {
    const resultHandler = async () => {
      const query = searchParams.get("q");
      if (!query) return;

      const res = await getUsers();
      setResults(res.filter((user) => user.displayName.includes(query)));
    };
    resultHandler();
  }, [refresh]);

  return (
    <div className="flex flex-col gap-3 mt-2 mb-4">
      {results.map(result => <UserCard user={result}/>)};
    </div>
  );
};

export default SearchResult;
