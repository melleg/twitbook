import { useEffect, useState } from "react";
import Post from "../post/post";
import { Link } from "react-router-dom";
import PostCard from "../post/PostCard";

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
        <PostCard post={post} />
      ))}
    </>
  );
};

export default Feed;
