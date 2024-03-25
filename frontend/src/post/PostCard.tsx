import { Link, useNavigate } from "react-router-dom";
import Post, { PostType } from "./post";
import { format } from "date-fns";
import { deletePost, likePost, repost } from "./post-service";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../auth/GlobalContext";
import { Globals } from "../globals";
import ReplyComponent from "./ReplyComponent";
import RenderText from "./RenderText";
import defaultImage from "/default.jpg";

interface PostCardProps {
  post: Post;
  hideReply?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const PostCard: React.FC<PostCardProps> = ({
  post: postProp,
  hideReply,
  className,
}) => {
  // const [post] = useState<Post>(postProp);
  // const [linkedPost] = useState<Post | undefined>(postProp.linkedPost);

  const navigate = useNavigate();

  const getPost = () =>
    postProp.type == PostType.REPOST ? postProp.linkedPost : postProp;

  const {
    loggedIn,
    myUsername,
    roles,
    postReplying,
    setPostReplying,
    refresh,
    setRefresh,
  } = useGlobalContext();
  const [deleted, setDeleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [replies, setReplies] = useState(getPost()?.replies ?? 0);
  const [likes, setLikes] = useState(getPost()?.likes ?? 0);
  const [reposts, setReposts] = useState(getPost()?.reposts ?? 0);
  const [hasLiked, setHasLiked] = useState(!!getPost()?.hasLiked);
  const [hasReposted, setHasReposted] = useState(!!getPost()?.hasReposted);
  const [hasReplied] = useState(!!getPost()?.hasReplied);

  useEffect(() => {}, [postProp, setPostReplying]);

  const authFail = (text: string) => {
    if (!loggedIn) alert(text);
    return !loggedIn;
  };

  const handleDelete = async (e: React.MouseEvent, post: Post) => {
    e.stopPropagation();

    if (authFail("You must be logged in to delete")) return;

    try {
      await deletePost(post.id);
      setDeleted(true);
      setRefresh(refresh + 1);
    } catch (error) {
      setErrorMessage("Post could not be deleted");
    }
  };

  const handleLike = async (e: React.MouseEvent, post: Post) => {
    e.stopPropagation();

    if (authFail("You must be logged in to like")) return;

    try {
      await likePost(post.id);
      setLikes((old) => old + (hasLiked ? -1 : 1));
      setHasLiked((old) => !old);
    } catch {
      setErrorMessage("Unable to like post");
    }
  };

  const handleReply = (e: React.MouseEvent, post: Post) => {
    e.stopPropagation();

    if (authFail("You must be logged in to reply")) return;
    setPostReplying(postReplying != post ? post : null);
  };

  const handleReplySuccess = () => {
    setReplies((old) => old + 1);
    setPostReplying(null);
    setErrorMessage("");
    setSuccessMessage("You replied.");
  };

  const handleRepost = async (e: React.MouseEvent, post: Post) => {
    e.stopPropagation();

    if (authFail("You must be logged in to repost")) return;

    try {
      await repost(post.id);
      setReposts((old) => old + (hasReposted ? -1 : 1));
      setHasReposted((old) => !old);
      setRefresh(refresh + 1);
    } catch (err) {
      setErrorMessage("Unable to repost");
    }
  };

  // Post html
  const PostContent = (props: { post: Post; children?: React.ReactNode }) => {
    switch (props.post.type) {
      // Post
      case PostType.POST:
        return (
          <>
            <UserInfo post={props.post} />
            {props.children}
            <RenderText content={props.post.content} />
            <BottomButtons post={props.post} />
          </>
        );

      // Repost
      case PostType.REPOST:
        if (!props.post.linkedPost)
          return <div>Error: original post not found</div>;

        return (
          <PostContent post={props.post.linkedPost}>
            <span className="ml-2 text-light italic">
              • 🔁 by {props.post.username}
            </span>
          </PostContent>
        );

      // Reply
      case PostType.REPLY:
        return (
          <>
            <UserInfo post={props.post} />
            {props.children}
            <RenderText content={props.post.content} />

            {/* Render original post */}
            {!hideReply && (
              <>
                {!props.post.linkedPost ? (
                  <div className="reply mt-1">
                    <span className="text-light">Not found</span>
                  </div>
                ) : (
                  <div
                    className="reply mt-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/posts/${props.post.linkedPost!.id}`);
                    }}
                  >
                    <UserInfo post={props.post.linkedPost} small={true} />
                    <RenderText content={props.post.linkedPost.content} />
                  </div>
                )}
              </>
            )}

            <BottomButtons post={props.post} />
          </>
        );
    }
  };

  const noPropagate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  // Post top info
  const UserInfo = (props: { post: Post; small?: boolean }) => (
    <>
      <Link to={`/profile/${props.post.username}`} onClick={noPropagate}>
        <img
          className={
            "inline-block rounded-full aspect-square " +
            (props.small ? "w-6 mr-1" : "w-14 absolute left-3 top-3")
          }
          src={
            props.post.profileImage
              ? `data:${props.post.profileImage.mimeType};base64,${props.post.profileImage.data}`
              : defaultImage
          }
        ></img>
      </Link>
      <div className="inline-flex items-center gap-1">
        <Link
          to={`/profile/${props.post.username}`}
          onClick={noPropagate}
          className="flex items-center gap-1"
        >
          <span className="h4">{props.post.displayName}</span>{" "}
          <span>@{props.post.username}</span>
        </Link>
        <span className="text-light">•</span>
        <span className="text-light">
          <Link
            to={`/posts/${props.post.id}`}
            onClick={noPropagate}
            className="text-light"
          >
            {format(props.post.postedDate, "dd MMMM yyyy")}
          </Link>
        </span>
      </div>
    </>
  );

  // Post bottom buttons
  const BottomButtons = (props: { post: Post }) => (
    <>
      <div className="flex flex-wrap gap-2 mt-1 text-left">
        {/* Likes */}
        <button
          className={"btn-icon w-16" + (hasLiked ? " activated" : "")}
          type="button"
          title="Like"
          onClick={(e) => handleLike(e, props.post)}
        >
          👍{likes}
        </button>
        {/* Replies */}
        <button
          className={"btn-icon w-16" + (hasReplied ? " activated" : "")}
          type="button"
          title="Reply"
          onClick={(e) => handleReply(e, props.post)}
        >
          ↪️{replies}
        </button>
        {/* Reposts */}
        <button
          className={"btn-icon w-16" + (hasReposted ? " activated" : "")}
          type="button"
          title="Repost"
          onClick={(e) => handleRepost(e, props.post)}
        >
          🔁{reposts}
        </button>
        {/* Reply input */}
        {loggedIn &&
          (myUsername === props.post.username ||
            roles.includes(Globals.ROLE_ADMIN)) && (
            <button
              className="btn-icon text-left"
              type="button"
              onClick={(e) => handleDelete(e, props.post)}
            >
              🗑 Delete Post
            </button>
          )}
        <p className="error-message">{errorMessage}</p>
      </div>
      <p className="italic text-light">{successMessage}</p>
      {postReplying == props.post && loggedIn && (
        <ReplyComponent onSubmit={handleReplySuccess} />
      )}
    </>
  );

  // If deleted...
  if (deleted)
    return (
      <p className="py-2 px-4 glass rounded-lg text-light">Post deleted</p>
    );

  return (
    <div
      onClick={(e) => {
        e.stopPropagation;
        navigate(`/posts/${getPost()!.id}`);
      }}
      className={`py-2 pl-20 pr-4 glass relative rounded-lg ${className ?? ""}`}
    >
      <PostContent post={postProp} />
    </div>
  );
};

export default PostCard;
