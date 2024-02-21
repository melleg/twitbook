import { useEffect, useState } from "react";
import Post from "../post/post";
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
    <div className="flex flex-col gap-2 pt-2">
      {loading ? (
        <span>Loading</span>
      ) : (
        <>
          {posts.length === 0 ? (
            <div className="glass rounded-lg p-4">No posts found</div>
          ) : (
            <>
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Feed;
