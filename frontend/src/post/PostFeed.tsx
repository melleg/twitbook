import { useContext, useEffect, useState } from "react";
import Post from "./post";
import PostCard from "./PostCard";
import PaginationControls from "../misc/PaginationControls";
import { MyGlobalContext } from "../auth/GlobalContext";
import { useSearchParams } from "react-router-dom";

interface FeedProps {
  getFunction: Promise<Post[]>;
  totalPages: number;
}

const PostFeed: React.FC<FeedProps> = ({ getFunction, totalPages }) => {
  const [setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const { refresh } = useContext(MyGlobalContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setPosts(await getFunction);
      setLoading(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, setSearchParams]);

  const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className="flex flex-col gap-2 py-2">{children}</div>;
  };

  // Loading
  if (loading)
    return (
      <Body>
        <span>Loading</span>
      </Body>
    );

  // No posts found
  if (posts.length === 0)
    return (
      <Body>
        <div className="glass rounded-lg p-4">No posts found</div>
      </Body>
    );

  // Posts
  return (
    <>
      <Body>
        {posts
          .sort((a, b) => b.postedDate.getTime() - a.postedDate.getTime())
          .map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
      </Body>
      <PaginationControls totalPages={totalPages} />
    </>
  );
};

export default PostFeed;
