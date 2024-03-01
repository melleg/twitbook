import { useState } from "react";
import Feed from "../feed/Feed";
import CreatePostComponent from "../post/CreatePostComponent";
import { getPosts, getPostsByFollowing } from "../post/post-service";
import { useGlobalContext } from "../auth/GlobalContext";

function Home() {
  const [refresh, setRefresh] = useState<number>(0);
  const { loggedIn } = useGlobalContext();

  return (
    <>
      {loggedIn ? (
        <>
          <CreatePostComponent onSubmit={() => setRefresh(refresh + 1)} />
          <Feed getFunction={getPostsByFollowing()} refresh={refresh} />
        </>
      ) : (
        <Feed getFunction={getPosts()} refresh={refresh} />
      )}
    </>
  );
}

export default Home;
