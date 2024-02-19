import { useEffect, useState } from "react";
import Post from "../post/post";
import axios from "axios";
import { Link } from "react-router-dom";

interface FeedProps {
  endpoint: string;
}

const Feed: React.FC<FeedProps> = ({ endpoint }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await axios.get(endpoint);
      setLoading(false);
      setPosts(result.data);
    };

    fetchData();
  }, []);

  return (
    <>
      {loading && <div>Loading</div>}
      {posts.map((post) => (
        <div
          className="border-black border-2 mb-12 px-2 rounded-md"
          key={post.id}
        >
          <div className="flex justify-between">
            <Link to={`/profile/${post.username}`}>
              Post by {post.username}:
            </Link>
            <h4>{post.postedDate.toString()}</h4>
          </div>
          <h4>{post.content}</h4>
        </div>
      ))}{" "}
    </>
  );
};

export default Feed;
