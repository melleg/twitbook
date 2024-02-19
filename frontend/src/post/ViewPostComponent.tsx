import axios from "axios";
import { useEffect, useState } from "react";
import Post from "./post";

function ViewPostsComponent() {

  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await axios.get(`http://localhost:8080/api/v1/posts`);
      setLoading(false);
      setPosts(result.data);      
    };

    fetchData();
  }, []);

  return (
    <div className="mt-16 mx-72">
      <p>Posts in the database:</p>
      {loading && <div>Loading</div>}
      {posts.map((post) => (
        <div
          className="border-black border-2 mb-12 px-2 rounded-md"
          key={post.id}
        >
          <div className="flex justify-between">
            <h3>Post by {post.username}:</h3>
            <h4>{post.postedDate.toString()}</h4>
          </div>
          <h4>{post.content}</h4>
        </div>
      ))}
    </div>
  );
}

export default ViewPostsComponent;
