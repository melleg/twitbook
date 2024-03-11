import { useState } from "react";
import Feed from "../feed/Feed";
import CreatePostComponent from "../post/CreatePostComponent";
import { getPosts, getPostsByFollowing } from "../post/post-service";
import { useGlobalContext } from "../auth/GlobalContext";

function Home() {
  const { loggedIn } = useGlobalContext();
  const [viewAll, setViewAll] = useState<boolean>(false);
  const { refresh, setRefresh } = useGlobalContext();

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
        <Feed getFunction={getPosts()} />
      ) : (
        <Feed getFunction={getPostsByFollowing()} />
      )}
    </>
  );
}

export default Home;
