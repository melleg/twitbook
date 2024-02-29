import { Link } from "react-router-dom";
import Post, { PostType } from "./post";
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
    } catch (error) {
      setErrorMessage("Post could not be deleted");
    }
  };

  interface UserInfoProps {
    username: string;
    small?: boolean;
  }

  const UserInfo: React.FC<UserInfoProps> = ({ username, small }) => (
    <>
      <Link to={`/profile/${username}`}>
        <img
          className={
            "inline-block rounded-full aspect-square " +
            (small ? "w-6 mr-1" : "w-14 absolute left-3 top-3")
          }
          src="https://picsum.photos/50"
        ></img>
      </Link>
      <Link to={`/profile/${username}`} className="h4 mr-1">
        @{username}
      </Link>
      <span className="text-light">
        • {format(post.postedDate, "dd MMMM yyyy")}
      </span>
    </>
  );

  const BottomButtons: React.FC<PostCardProps> = ({ post }) => (
    <div className="flex flex-wrap gap-2 mt-1">
      <button className="btn-icon w-16 text-left" type="button" title="Like">
        👍1k
      </button>
      <button className="btn-icon w-16 text-left" type="button" title="Reply">
        ↪️1k
      </button>
      <button className="btn-icon w-16 text-left" type="button" title="Repost">
        🔁1k
      </button>
      {loggedIn &&
        (myUsername === post.username ||
          roles.includes(Globals.ROLE_ADMIN)) && (
          <button
            className="btn-icon text-left"
            type="button"
            onClick={handleDelete}
          >
            🗑 Delete Post
          </button>
        )}
      <p className="error-message">{errorMessage}</p>
    </div>
  );

  const PostContent: React.FC<PostCardProps> = ({ post }) => (
    <p className="w-full break-words hyphens-auto">{post.content}</p>
  );

  // If deleted...
  if (deleted)
    return (
      <p className="py-2 px-4 glass rounded-lg text-light">Post deleted</p>
    );

  switch (post.type) {
    // Post
    case PostType.POST:
      return (
        <div className="py-2 pl-20 pr-4 glass rounded-lg">
          <>
            <UserInfo username={post.username} />
            <PostContent post={post} />
            <BottomButtons post={post} />
          </>
        </div>
      );

    // Repost
    case PostType.REPOST:
      if (!post.linkedPost) return <div>Error: original post not found</div>;

      return (
        <div className="py-2 pl-20 pr-4 glass rounded-lg">
          <>
            <UserInfo username={post.linkedPost.username} />
            <span className="ml-2 text-light italic">
              • 🔁 by {post.username}
            </span>
            <PostContent post={post.linkedPost} />
            <BottomButtons post={post.linkedPost} />
          </>
        </div>
      );

    // Reply
    case PostType.REPLY:
      return (
        <div className="py-2 pl-20 pr-4 glass rounded-lg">
          <>
            <UserInfo username={post.username} />
            <PostContent post={post} />

            <div className="rounded-lg border-2 border-gray-500 p-2 mt-1">
              {!post.linkedPost ? (
                <span className="text-light">Not found</span>
              ) : (
                <>
                  <UserInfo username={post.linkedPost.username} small={true} />
                  <PostContent post={post.linkedPost} />
                </>
              )}
            </div>

            <BottomButtons post={post} />
          </>
        </div>
      );
  }
};

export default PostCard;
