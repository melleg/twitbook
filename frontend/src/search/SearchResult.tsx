import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { queryUsers } from "../user/user-service";
import User from "../user/user";
import { useGlobalContext } from "../auth/GlobalContext";
import { format } from "date-fns";
import Post from "../post/post";
import { getPostsByHashtag } from "../post/post-service";
import PaginationControls from "../feed/PaginationControls";

const SearchResult: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { refresh } = useGlobalContext();
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const resultHandler = async () => {
      const generalQuery = searchParams.get("q");
      const hashtagQuery = searchParams.get("h");
      const page = parseInt(searchParams.get("page") ?? "0");

      console.log(hashtagQuery);
      // Search for hashtag
      if (hashtagQuery) {
        const results = await getPostsByHashtag(
          hashtagQuery,
          page,
          setTotalPages
        );
        setPosts(results);
      }
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

  return (
    <>
      {/* Hashtag results */}
      <div className="flex flex-col gap-3 mt-2 mb-4">
        {posts.map((post) => (
          // TODO
          <div>{post.id}</div>
        ))}
      </div>

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
