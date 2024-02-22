import { useEffect, useState } from "react";
import Feed from "../feed/Feed";
import CreatePostComponent from "../post/CreatePostComponent";
import { getPosts } from "../post/post-service";

function Home() {
  const [refresh, setRefresh] = useState<number>(0);

  return (
    <>
      <CreatePostComponent onSubmit={() => setRefresh(refresh + 1)} />
      <Feed getFunction={getPosts()} refresh={refresh} />
    </>
  );
}

export default Home;
