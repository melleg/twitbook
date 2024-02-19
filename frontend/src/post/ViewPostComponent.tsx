import Feed from "../feed/Feed";

function ViewPostsComponent() {
  return (
    <div className="mt-16 mx-72">
      <p>Posts in the database:</p>
      <Feed endpoint="http://localhost:8080/api/v1/posts" />
    </div>
  );
}

export default ViewPostsComponent;
