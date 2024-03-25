import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "./post";
import { getPostById, getPostResponses } from "./post-service";
import PostCard from "./PostCard";
import PaginationControls from "../misc/PaginationControls";

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
    setResponses(await getPostResponses(postId, 0, setTotalPages));
  };

  if (!post) return <div>No post...</div>;

  return (
    <div className="mt-2">
      {/* Back link */}
      <a className="text-white font-bold" onClick={() => window.history.back()}>
        Back
      </a>

      {responses.length === 0 ? (
        <PostCard post={post}></PostCard>
      ) : (
        <>
          {/* Original post */}
          <PostCard post={post} className="rounded-b-none"></PostCard>
          {/* Responses to post */}
          <div className="replies">
            <p>{responses.length} replies</p>
            {responses.map((response) => (
              <PostCard post={response} hideReply={true}></PostCard>
            ))}
            <br />
            <PaginationControls totalPages={totalPages}></PaginationControls>
            <br />
          </div>
        </>
      )}
    </div>
  );
};

export default PostDetails;
