import axios from "axios";
import { useEffect, useState } from "react";
import Post, { emptyPost } from "./interface/PostInterface";

function ViewPostsComponent() {
  const [posts, setPosts] = useState<Post[]>([emptyPost]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:8080/api/v1/posts`);

      setPosts(result.data);
      console.log(result.data);
      
    };

    fetchData();
  }, []);

  return (
    <div className="mt-16 mx-72">
      <p>Posts in the database:</p>
      {posts.map((post) => (
        <div
          className="border-black border-2 mb-12 px-2 rounded-md"
          key={post.id}
        >
          <div className="flex justify-between">
            <h3>Post by {post.author.username}:</h3>
            <h4>{post.postedDate}</h4>
          </div>
          <h4>{post.content}</h4>
        </div>
      ))}
    </div>
  );
}

export default ViewPostsComponent;
