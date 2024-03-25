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
      {responses.length === 0 ? (
        <PostCard post={post}></PostCard>
      ) : (
        <>
          {/* Original post */}
          <PostCard post={post}></PostCard>
          {/* Responses to post */}
          <div className="replies mt-1 flex flex-col gap-2">
            <span className="text-white font-bold">
              {responses.length} {responses.length === 1 ? "reply" : "replies"}
            </span>
            {responses.map((response) => (
              <PostCard
                key={response.id}
                post={response}
                hideReply={true}
              ></PostCard>
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
