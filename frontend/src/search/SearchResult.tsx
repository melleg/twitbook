import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { queryUsers } from "../user/user-service";
import { useGlobalContext } from "../auth/GlobalContext";
import { getPostsByHashtag as queryPostsByHashtag } from "../post/post-service";
import PostFeed from "../post/PostFeed";
import UserFeed from "../user/UserFeed";

const SearchResult: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { refresh } = useGlobalContext();
  const [totalPages, setTotalPages] = useState<number>(0);

  const getHashtagQuery = () => {
    return searchParams.get("h");
  };

  const getQuery = () => {
    return searchParams.get("q");
  };

  useEffect(() => {}, [refresh, searchParams]);

  const getPage = () => {
    return parseInt(searchParams.get("page") ?? "0");
  };

  // Hashtag results
  if (getHashtagQuery()) {
    return (
      <>
        <h3 className="text-white mt-4 mb-2">
          Showing posts with hashtag <i>#{getHashtagQuery()}</i>
        </h3>
        <PostFeed
          getFunction={queryPostsByHashtag(
            getHashtagQuery()!,
            getPage(),
            setTotalPages
          )}
          totalPages={totalPages}
        />
      </>
    );
  }

  // User results
  return (
    <>
      <h3 className="text-white mt-4 mb-2">
        Showing users with name "<i>{getQuery()}</i>"
      </h3>
      <UserFeed
        getFunction={queryUsers(getQuery()!, getPage(), setTotalPages)}
        totalPages={totalPages}
      />
    </>
  );
};

export default SearchResult;
