import { Link } from "react-router-dom";
import Post, { PostType } from "./post";
import { format } from "date-fns";
import { deletePost, repost } from "./post-service";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../auth/GlobalContext";
import { Globals } from "../globals";
import ReplyComponent from "./ReplyComponent";

const PostCard = (props: { post: Post }) => {
  const [post, setPost] = useState<Post>(props.post);
  const [linkedPost, setLinkedPost] = useState<Post | undefined>(
    props.post.linkedPost
  );
  const [deleted, setDeleted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { loggedIn, myUsername, roles, postReplying, setPostReplying } =
    useGlobalContext();

  useEffect(() => {}, [post]);

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

  const handleRepost = async (post: Post) => {
    if (authFail("You must be logged in to repost")) return;

    try {
      await repost(post.id);
      setPost((old) => ({ ...old, hasReposted: !old.hasReposted }));
      setLinkedPost((old) => old && { ...old, hasReposted: !old.hasReposted });
    } catch (err) {
      setErrorMessage("Unable to repost");
    }
  };

  const UserInfo = (props: { username: string; small?: boolean }) => (
    <>
      <Link to={`/profile/${props.username}`}>
        <img
          className={
            "inline-block rounded-full aspect-square " +
            (props.small ? "w-6 mr-1" : "w-14 absolute left-3 top-3")
          }
          src="https://picsum.photos/50"
        ></img>
      </Link>
      <Link to={`/profile/${props.username}`} className="h4 mr-1">
        @{props.username}
      </Link>
      <span className="text-light">
        • {format(post.postedDate, "dd MMMM yyyy")}
      </span>
    </>
  );

  const PostContent = () => {
    switch (post.type) {
      // Post
      case PostType.POST:
        return (
          <>
            <UserInfo username={post.username} />
            <PostBody content={post.content} />
            <BottomButtons post={post} />
          </>
        );

      // Repost
      case PostType.REPOST:
        if (!linkedPost) return <div>Error: original post not found</div>;

        return (
          <>
            <UserInfo username={linkedPost.username} />
            <span className="ml-2 text-light italic">
              • 🔁 by {post.username}
            </span>
            <PostBody content={linkedPost.content} />
            <BottomButtons post={linkedPost} />
          </>
        );

      // Reply
      case PostType.REPLY:
        return (
          <>
            <UserInfo username={post.username} />
            <PostBody content={post.content} />
            <div className="rounded-lg border-2 border-gray-500 p-2 mt-1">
              {!linkedPost ? (
                <span className="text-light">Not found</span>
              ) : (
                <>
                  <UserInfo username={linkedPost.username} small={true} />
                  <PostBody content={linkedPost.content} />
                </>
              )}
            </div>
            <BottomButtons post={post} />
          </>
        );
    }
  };

  const PostBody = (props: { content: string }) => (
    <p className="w-full break-words hyphens-auto">{props.content}</p>
  );

  const BottomButtons = (props: { post: Post }) => (
    <>
      <div className="flex flex-wrap gap-2 mt-1 text-left">
        <button
          className={
            "btn-icon w-16" + (props.post.hasLiked ? " activated" : "")
          }
          type="button"
          title="Like"
        >
          👍1k
        </button>
        <button
          className="btn-icon w-16"
          type="button"
          title="Reply"
          onClick={() => handleReply(props.post)}
        >
          ↪️1k
        </button>
        <button
          className={
            "btn-icon w-16" + (props.post.hasReposted ? " activated" : "")
          }
          type="button"
          title="Repost"
          onClick={() => handleRepost(props.post)}
        >
          🔁1k
        </button>
        {loggedIn &&
          (myUsername === props.post.username ||
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
      {postReplying == props.post && loggedIn && (
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
    <div className="py-2 pl-20 pr-4 glass rounded-lg">{<PostContent />}</div>
  );
};

export default PostCard;
