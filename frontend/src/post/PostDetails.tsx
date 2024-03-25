import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Post from "./post";
import { getPostById, getPostResponses } from "./post-service";
import PostCard from "./PostCard";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [responses, setResponses] = useState<Post[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    loadPost();
  }, [id]);

  const loadPost = async () => {
    // Load post
    if (!id) return;
    const postId = Number(id);
    setPost(await getPostById(postId));

    // Load responses
    setResponses(await getPostResponses(postId, 1, setTotalPages));
  };

  if (!post) return <div>No post...</div>;

  return (
    <div className="mt-2">
      {/* Back link */}
      <a className="text-white font-bold" onClick={() => window.history.back()}>
        Back
      </a>

      {/* Original post */}
      <PostCard post={post}></PostCard>

      {/* Responses to post */}
      {responses.map((r) => (
        <div>{r.id}</div>
      ))}
    </div>
  );
};

export default PostDetails;
