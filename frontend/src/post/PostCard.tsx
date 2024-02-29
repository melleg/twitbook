import { Link } from "react-router-dom";
import Post, { PostType } from "./post";
import { format } from "date-fns";
import { deletePost, repost } from "./post-service";
import { useState } from "react";
import { useGlobalContext } from "../auth/GlobalContext";
import { Globals } from "../globals";
import ReplyComponent from "./ReplyComponent";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [deleted, setDeleted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { loggedIn, myUsername, roles, postReplying, setPostReplying } =
    useGlobalContext();

  const authFail = (text: string) => {
    if (!loggedIn) alert(text);
    return !loggedIn;
  };

  const handleDelete = async () => {
    if (authFail("You must be logged in to delete")) return;

    try {
      await deletePost(post.id);
      setDeleted(true);
    } catch (error) {
      setErrorMessage("Post could not be deleted");
    }
  };

  const handleReply = (post: Post) => {
    if (authFail("You must be logged in to reply")) return;

    setPostReplying(post);
  };

  const handleRepost = async (postId: number) => {
    if (authFail("You must be logged in to repost")) return;

    try {
      await repost(postId);
    } catch (err) {
      setErrorMessage("Unable to repost");
    }
  };

  const getUserInfo = (username: string, small?: boolean) => (
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

  const getPostContent = (post: Post) => {
    switch (post.type) {
      // Post
      case PostType.POST:
        return (
          <>
            {getUserInfo(post.username)}
            {getText(post.content)}
            {getBottomButtons(post)}
          </>
        );

      // Repost
      case PostType.REPOST:
        if (!post.linkedPost) return <div>Error: original post not found</div>;

        return (
          <>
            {getUserInfo(post.linkedPost.username)}
            <span className="ml-2 text-light italic">
              • 🔁 by {post.username}
            </span>
            {getText(post.linkedPost.content)}
            {getBottomButtons(post.linkedPost)}
          </>
        );

      // Reply
      case PostType.REPLY:
        return (
          <>
            {getUserInfo(post.username)}
            {getText(post.content)}
            <div className="rounded-lg border-2 border-gray-500 p-2 mt-1">
              {!post.linkedPost ? (
                <span className="text-light">Not found</span>
              ) : (
                <>
                  {getUserInfo(post.linkedPost.username, true)}
                  {getText(post.linkedPost.content)}
                </>
              )}
            </div>
            {getBottomButtons(post)}
          </>
        );
    }
  };

  const getText = (content: string) => (
    <p className="w-full break-words hyphens-auto">{content}</p>
  );

  const getBottomButtons = (post: Post) => (
    <>
      <div className="flex flex-wrap gap-2 mt-1 text-left">
        <button className="btn-icon w-16" type="button" title="Like">
          👍1k
        </button>
        <button
          className="btn-icon w-16"
          type="button"
          title="Reply"
          onClick={() => handleReply(post)}
        >
          ↪️1k
        </button>
        <button
          className="btn-icon w-16"
          type="button"
          title="Repost"
          onClick={() => handleRepost(post.id)}
        >
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
      {postReplying == post && loggedIn && (
        <ReplyComponent onSubmit={() => {}} />
      )}
    </>
  );

  // If deleted...
  if (deleted)
    return (
      <p className="py-2 px-4 glass rounded-lg text-light">Post deleted</p>
    );

  return (
    <div className="py-2 pl-20 pr-4 glass rounded-lg">
      {getPostContent(post)}
    </div>
  );
};

export default PostCard;
