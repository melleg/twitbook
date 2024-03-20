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
      <PostFeed
        getFunction={queryPostsByHashtag(
          getHashtagQuery()!,
          getPage(),
          setTotalPages
        )}
        totalPages={totalPages}
      />
    );
  }

  // User results
  return (
    <UserFeed
      getFunction={queryUsers(getQuery()!, getPage(), setTotalPages)}
      totalPages={totalPages}
    />
  );
};

export default SearchResult;
