import Feed from "../feed/Feed";
import CreatePostComponent from "../post/CreatePostComponent";
import { getPosts } from "../post/post-service";
import { useGlobalContext } from "../auth/GlobalContext";

function Home() {
  const { loggedIn } = useGlobalContext();

  return (
    <>
      {loggedIn && <CreatePostComponent />}

      <Feed getFunction={getPosts()} />
    </>
  );
}

export default Home;
