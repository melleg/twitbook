import { useState } from "react";
import Feed from "../feed/Feed";
import CreatePostComponent from "../post/CreatePostComponent";
import { getPosts, getPostsByFollowing } from "../post/post-service";
import { useGlobalContext } from "../auth/GlobalContext";
import { useSearchParams } from "react-router-dom";

function Home() {
  const { loggedIn, refresh, setRefresh } = useGlobalContext();
  const [viewAll, setViewAll] = useState<boolean>(true);
  const [ searchParams ] = useSearchParams();

  const showFollowingOnly = (value: boolean) => {
    if (value !== viewAll) {
      setViewAll(value);
      setRefresh(refresh + 1);
    }
  };

  const getPage = () => {
    if(!searchParams) console.error("No search params!");
    return parseInt(searchParams.get("page") ?? "0");
  }

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
              View followers only
            </button>
          </div>
          <CreatePostComponent />
        </>
      )}

      {viewAll ? (
        <>
          <Feed getFunction={getPosts(getPage())} />
        </>
      ) : (
        <Feed getFunction={getPostsByFollowing(0)} />
      )}
    </>
  );
}

export default Home;
