import { Link } from "react-router-dom";
import Post from "./post";
import { format } from "date-fns";
import { deletePost } from "./post-service";
import { useState } from "react";
import { useGlobalContext } from "../auth/GlobalContext";
import { Globals } from "../globals";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [deleted, setDeleted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { loggedIn, myUsername, roles } = useGlobalContext();

  const handleDelete = async () => {
    try {
      await deletePost(post.id);
      setDeleted(true);
    } catch (error: any) {
      setErrorMessage("Post could not be deleted");
    }
  };
  return (
    <div className="py-2 pl-20 pr-4 glass rounded-lg items-start gap-2">
      {deleted ? (
        <p>Post deleted</p>
      ) : (
        <>
          <Link to={`/profile/${post.username}`}>
            <img
              className="w-14 rounded-full aspect-square absolute top-3 left-3"
              src="https://picsum.photos/50"
            ></img>
          </Link>
          <div className="flex flex-wrap gap-2 items-center">
            <Link to={`/profile/${post.username}`}>
              <h4>@{post.username}</h4>
            </Link>
            <span className="text-light">
              - {format(post.postedDate, "dd MMMM yyyy")}
            </span>
          </div>
          <p className="text-ellipsis w-full hyphens-auto whitespace-normal">
            {post.content}
          </p>
          <div className="flex flex-wrap gap-2 mt-1">
            <button className="btn-icon w-16 text-left" type="button">
              👍1k
            </button>
            <button className="btn-icon w-16 text-left" type="button">
              🔁1k
            </button>
            {(loggedIn && (myUsername === post.username || roles.includes(Globals.ROLE_ADMIN)))&& (<button
              className="btn-icon text-left"
              type="button"
              onClick={handleDelete}
            >
              🗑 Delete Post
            </button>)}
            <p className="error-message">{errorMessage}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default PostCard;
