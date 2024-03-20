import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getUsers } from "../user/user-service";
import User from "../user/user";
import { useGlobalContext } from "../auth/GlobalContext";
import { format } from "date-fns";

const SearchResult: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { refresh } = useGlobalContext();
  const [results, setResults] = useState<User[]>([]);

  useEffect(() => {
    const resultHandler = async () => {
      const query = searchParams.get("q");
      if (!query) return;

      const res = await getUsers();
      setResults(res.filter((User) => User.displayName.includes?.(query)));
    };
    resultHandler();
  }, [refresh]);

  return (
    <div className="flex flex-col gap-2 mt-2 mb-4">
      {results.map((user) => (
        <div
          key={user.username}
          className="my-2 py-2 pl-4 pr-4 glass rounded-lg text-left text-light gap-2 flex "
        >
          <Link to={`/profile/${user.displayName}`}>
            <img
              className={
                "inline-block rounded-full aspect-square mr-1 w-14 left-3 top-3"
              }
              src="https://picsum.photos/50"
            ></img>
          </Link>
          <div className="flex flex-col justify-center">
            <div>
              <Link
                className="font-bold mr-1 text-black"
                to={`/profile/${user.displayName}`}
              >
                {user.displayName}
              </Link>
              @{user.username} • User since:{" "}
              {format(user.registerDate, "dd MMMM yyyy")}
            </div>
            {user.bio?.length > 0 && <p>"{user.bio}"</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
