import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "./post";
import { getPostById } from "./post-service";
import PostCard from "./PostCard";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = async () => {
    if (!id) return;
    const postId = Number(id);
    setPost(await getPostById(postId));
  };

  if (!post) return <div>No post...</div>;

  return <PostCard post={post}></PostCard>;
};

export default PostDetails;
