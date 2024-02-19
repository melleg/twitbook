import { useEffect, useState } from "react";
import Post from "../post/post";
import { Link } from "react-router-dom";

interface FeedProps {
  getFunction: Promise<Post[]>;
}

const Feed: React.FC<FeedProps> = ({ getFunction }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setPosts(await getFunction);
      setLoading(false);
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
