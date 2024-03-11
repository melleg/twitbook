import { useState } from "react";
import Feed from "../feed/Feed";
import CreatePostComponent from "../post/CreatePostComponent";
import { getPosts, getPostsByFollowing } from "../post/post-service";
import { useGlobalContext } from "../auth/GlobalContext";

function Home() {
  const [refresh, setRefresh] = useState<number>(0);
  const { loggedIn } = useGlobalContext();
  const [viewAll, setViewAll] = useState<boolean>(false);

  const handleToggle = (value: boolean) => {
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
        <button className="btn-action my-4" onClick={() => handleToggle(false)}>View all posts</button>
        <button className="btn-action my-4" onClick={() => handleToggle(true)}>View followers only</button>
        </div>
        <CreatePostComponent onSubmit={() => setRefresh(refresh + 1)} />
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
