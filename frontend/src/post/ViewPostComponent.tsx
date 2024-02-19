import Feed from "../feed/Feed";

function ViewPostsComponent() {
  return (
    <div>
      <p>Posts in the database:</p>
      <Feed endpoint="http://localhost:8080/api/v1/posts" />
    </div>
  );
}

export default ViewPostsComponent;
