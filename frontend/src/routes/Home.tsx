import { useState } from "react";
import Feed from "../feed/Feed";
import CreatePostComponent from "../post/CreatePostComponent";
import { getPosts, getPostsByFollowing } from "../post/post-service";
import { useGlobalContext } from "../auth/GlobalContext";

function Home() {
  const [refresh, setRefresh] = useState<number>(0);
  const { loggedIn } = useGlobalContext();
  const [viewAll, setViewAll] = useState<boolean>(false);

  const handleToggle = () => {
    setViewAll(!viewAll);
    setRefresh(refresh + 1);
  };

  return (
    <>
      {loggedIn && (
        <>
        <CreatePostComponent onSubmit={() => setRefresh(refresh + 1)} />
        <button className="btn-action my-4" onClick={() => handleToggle()}>{viewAll ? "View all posts" : "View followers only"}</button>
        </>
      )}

      {viewAll ? (
        <Feed getFunction={getPostsByFollowing()} refresh={refresh} />
      ) : (
        <Feed getFunction={getPosts()} refresh={refresh} />
      )}
    </>
  );
}

export default Home;
