import { Link } from "react-router-dom";
import Post from "./post";
import { format } from "date-fns";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="p-4 glass rounded-lg flex flex-wrap items-start gap-2">
      <Link to={`/profile/${post.username}`}>
        <img
          className="w-14 rounded-full aspect-square"
          src="https://picsum.photos/50"
        ></img>
      </Link>
      <div className="flex flex-col">
        <div className="flex flex-wrap gap-1 items-center">
          <Link to={`/profile/${post.username}`} className="h4">
            @{post.username}
          </Link>
          {post.linkedPost && (<span className="h4 text-light">replied</span>)}
          <span className="text-light">
            - {format(post.postedDate, "dd MMMM yyyy")}
          </span>
        </div>
        
        {/* Content */}
        <p>{post.content}</p>

        {/* Reposts */}
        {post.linkedPost && (
        <div className="rounded-lg border-2 border-gray-500 p-2 mt-1">
          <img
            className="w-6 mr-1 inline-block rounded-full aspect-square"
            src="https://picsum.photos/50">
          </img>
          <Link to={`/profile/${post.linkedPost.username}`} className="h4 mr-1" >
            @{post.linkedPost.username}
          </Link>
          <span className="text-light">{format(post.postedDate, "dd MMMM yyyy")}</span>
          <p>"{post.linkedPost.content}"</p>
        </div>)}

        {/* Bottom buttons */}
        <div className="flex flex-wrap gap-2 mt-1">
          <button className="btn-icon w-16 text-left" type="button">
            👍1k
          </button>
          <button className="btn-icon w-16 text-left" type="button">
            🔁1k
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
