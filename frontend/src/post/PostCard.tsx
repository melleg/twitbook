import { Link } from "react-router-dom";
import Post from "./post";
import { format } from "date-fns";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="card flex flex-wrap items-start gap-2" key={post.id}>
      <img
        className="w-14 rounded-full aspect-square"
        src="https://picsum.photos/50"
      ></img>
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
      </div>
    </div>
  );
};

export default PostCard;
