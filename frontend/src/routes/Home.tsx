import Feed from "../feed/Feed";
import { getPosts } from "../post/post-service";

function Home() {
  return (
    <>
      <div>
        <Feed getFunction={getPosts()} />
      </div>{" "}
    </>
  );
}

export default Home;
