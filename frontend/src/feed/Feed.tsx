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
  const { refresh, setRefresh, page, setPage } = useGlobalContext();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setPosts(await getFunction);
      setLoading(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className="flex flex-col gap-2 pt-2">{children}</div>;
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
      <div className="flex justify-around">
        {page !== 0 && (
          <button
            className="btn-action"
            onClick={() => {
              setPage(page - 1);
              setRefresh(refresh + 1);
            }}
          >
            Previous
          </button>
        )}
        <button
          className="btn-action"
          onClick={() => {
            setPage(page + 1);
            setRefresh(refresh + 1);
          }}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Feed;
