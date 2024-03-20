import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { queryUsers } from "../user/user-service";
import User from "../user/user";
import { useGlobalContext } from "../auth/GlobalContext";
import { format } from "date-fns";
import { getPostsByHashtag } from "../post/post-service";
import PaginationControls from "../misc/PaginationControls";
import PostFeed from "../post/PostFeed";

const SearchResult: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { refresh } = useGlobalContext();
  const [users, setUsers] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [hashtagQuery, setHashtagQuery] = useState<string | null>(null);

  useEffect(() => {
    const resultHandler = async () => {
      const generalQuery = searchParams.get("q");
      setHashtagQuery(searchParams.get("h"));
      const page = parseInt(searchParams.get("page") ?? "0");

      console.log(hashtagQuery);
      // Search for user
      if (generalQuery) {
        const results = await queryUsers(generalQuery, page, setTotalPages);
        setUsers(
          results.filter((user) => user.displayName.includes(generalQuery))
        );
      }
    };
    resultHandler();
  }, [refresh, searchParams]);

  const getPage = () => {
    return parseInt(searchParams.get("page") ?? "0");
  };

  // Hashtag results
  if (hashtagQuery) {
    return (
      <PostFeed
        getFunction={getPostsByHashtag(hashtagQuery, getPage(), setTotalPages)}
        totalPages={totalPages}
      />
    );
  }

  // User results
  return (
    <>
      {/* User results */}
      <div className="flex flex-col gap-3 mt-2 mb-4">
        {users.map((user) => (
          <div
            key={user.username}
            className="py-2 pl-4 pr-4 glass rounded-lg text-left text-light gap-2 flex "
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

      {/* Pagination controls */}
      <PaginationControls totalPages={totalPages} />
    </>
  );
};

export default SearchResult;
