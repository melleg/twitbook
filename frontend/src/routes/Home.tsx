import { useState } from "react";
import Feed from "../feed/Feed";
import CreatePostComponent from "../post/CreatePostComponent";
import { getPosts, getPostsByFollowing } from "../post/post-service";
import { useGlobalContext } from "../auth/GlobalContext";

function Home() {
  const { loggedIn, refresh, setRefresh } = useGlobalContext();
  const [viewAll, setViewAll] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);

  const showFollowingOnly = (value: boolean) => {
    if (value !== viewAll) {
      setViewAll(value);
      setRefresh(refresh + 1);
    }
  };

  return (
    <>
      {loggedIn && (
        <>
          <div className="flex justify-around justiy-stretch">
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
              View followers only
            </button>
          </div>
          <CreatePostComponent />
        </>
      )}

      {viewAll ? (
        <>
          <Feed getFunction={getPosts(page)} />
          <button
            className="btn-action"
            onClick={() => {
              setPage(page + 1);
              setRefresh(refresh + 1);
            }}
          >
            +
          </button>
          <button
            className="btn-action"
            onClick={() => {
              setPage(page - 1);
              setRefresh(refresh + 1);
            }}
          >
            -
          </button>
        </>
      ) : (
        <Feed getFunction={getPostsByFollowing()} />
      )}
    </>
  );
}

export default Home;
