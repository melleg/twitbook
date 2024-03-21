import { useState } from "react";
import PostFeed from "../post/PostFeed";
import CreatePostComponent from "../post/CreatePostComponent";
import { getPosts, getPostsByFollowing } from "../post/post-service";
import { useGlobalContext } from "../auth/GlobalContext";
import { useSearchParams } from "react-router-dom";

function Home() {
  const { loggedIn, refresh, setRefresh } = useGlobalContext();
  const [viewAll, setViewAll] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState<number>(0);

  const showFollowingOnly = (value: boolean) => {
    if (value !== viewAll) {
      setViewAll(value);
      setPage(0);
      setRefresh(refresh + 1);
    }
  };

  const getPage = () => {
    if (!searchParams) console.error("No search params!");
    return parseInt(searchParams.get("page") ?? "0");
  };

  const setPage = (page: number) => {
    if (!searchParams) console.error("No search params!");
    setSearchParams({ page: page.toString() });
  };

  return (
    <>
      {loggedIn && (
        <>
          <div className="flex justify-around">
            <button
              className="btn-action my-4"
              onClick={() => showFollowingOnly(true)}
            >
              View all posts
            </button>
            <button
              className="btn-action my-4"
              onClick={() => showFollowingOnly(false)}
            >
              View personal feed
            </button>
          </div>
          <CreatePostComponent />
        </>
      )}

      {viewAll ? (
        <>
          <PostFeed
            getFunction={getPosts(getPage(), setTotalPages)}
            totalPages={totalPages}
          />
        </>
      ) : (
        <PostFeed
          getFunction={getPostsByFollowing(getPage(), setTotalPages)}
          totalPages={totalPages}
        />
      )}
    </>
  );
}

export default Home;
