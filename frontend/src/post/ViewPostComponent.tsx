import Feed from "../feed/Feed";
import { getPosts } from "./post-service";

function ViewPostsComponent() {
  return (
    <div>
      <p>Posts in the database:</p>
      <Feed getFunction={getPosts()} />
    </div>
  );
}

export default ViewPostsComponent;
