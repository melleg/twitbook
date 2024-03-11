import { useEffect, useState } from "react";
import Post from "../post/post";
import PostCard from "../post/PostCard";
import { useGlobalContext } from "../auth/GlobalContext";

interface FeedProps {
  getFunction: Promise<Post[]>;
}

const Feed: React.FC<FeedProps> = ({ getFunction }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const { refresh } = useGlobalContext();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setPosts(await getFunction);
      setLoading(false);
    };

    fetchData();
  }, [refresh]);

  if (loading) return <span>Loading</span>;

  return (
    <div className="flex flex-col gap-2 pt-2">
      {posts.length === 0 ? (
        <div className="glass rounded-lg p-4">No posts found</div>
      ) : (
        <>
          {posts
            .sort((a, b) => b.postedDate.getTime() - a.postedDate.getTime())
            .map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
        </>
      )}
    </div>
  );
};

export default Feed;
