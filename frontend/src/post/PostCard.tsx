import { Link } from "react-router-dom";
import Post from "./post";
import { format } from "date-fns";
import { deletePost } from "./post-service";
import { useState } from "react";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [deleted, setDeleted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = async () => {
    try {
      await deletePost(post.id);
      setDeleted(true);
    } catch (error: any) {
      setErrorMessage("Post could not be deleted");
    }
  };
  return (
    <>
      <div className="p-4 glass rounded-lg flex flex-wrap items-start gap-2">
        {deleted ? (
          <p>Post deleted</p>
        ) : (
          <>
            <Link to={`/profile/${post.username}`}>
              <img
                className="w-14 rounded-full aspect-square"
                src="https://picsum.photos/50"
              ></img>
            </Link>
            <div className="flex flex-col">
              <div className="flex flex-wrap gap-2 items-center">
                <Link to={`/profile/${post.username}`}>
                  <h4>@{post.username}</h4>
                </Link>
                <span className="text-light">
                  - {format(post.postedDate, "dd MMMM yyyy")}
                </span>
              </div>
              <p>{post.content}</p>
              <div className="flex flex-wrap gap-2 mt-1">
                <button className="btn-icon w-16 text-left" type="button">
                  👍1k
                </button>
                <button className="btn-icon w-16 text-left" type="button">
                  🔁1k
                </button>
                <button
                  className="btn-icon text-left"
                  type="button"
                  onClick={handleDelete}
                >
                  🗑 Delete Post
                </button>
                <p className="error-message">{errorMessage}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PostCard;
