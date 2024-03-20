import { Link } from "react-router-dom";
import Post, { PostType } from "./post";
import { format } from "date-fns";
import { deletePost, likePost, repost } from "./post-service";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../auth/GlobalContext";
import { Globals } from "../globals";
import ReplyComponent from "./ReplyComponent";
import RenderText from "./RenderText";
import Image from "../user/image";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post: postProp }) => {
  const [post] = useState<Post>(postProp);
  const [linkedPost] = useState<Post | undefined>(postProp.linkedPost);

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

  useEffect(() => {}, [post, setPostReplying]);

  const authFail = (text: string) => {
    if (!loggedIn) alert(text);
    return !loggedIn;
  };

  const handleDelete = async (post: Post) => {
    if (authFail("You must be logged in to delete")) return;

    try {
      await deletePost(post.id);
      setDeleted(true);
      setRefresh(refresh + 1);
    } catch (error) {
      setErrorMessage("Post could not be deleted");
    }
  };

  const handleLike = async (post: Post) => {
    if (authFail("You must be logged in to like")) return;

    try {
      await likePost(post.id);
      setLikes((old) => old + (hasLiked ? -1 : 1));
      setHasLiked((old) => !old);
    } catch {
      setErrorMessage("Unable to like post");
    }
  };

  const handleReply = (post: Post) => {
    if (authFail("You must be logged in to reply")) return;
    setPostReplying(postReplying != post ? post : null);
  };

  const handleReplySuccess = () => {
    setReplies((old) => old + 1);
    setPostReplying(null);
    setErrorMessage("");
    setSuccessMessage("You replied.");
  };

  const handleRepost = async (post: Post) => {
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
  const PostContent = () => {
    switch (post.type) {
      // Post
      case PostType.POST:
        return (
          <>
            <UserInfo
              displayName={post.displayName}
              username={post.username}
              profileImage={post.profileImage}
            />
            <RenderText content={post.content} />
            <BottomButtons post={post} />
          </>
        );

      // Repost
      case PostType.REPOST:
        if (!linkedPost) return <div>Error: original post not found</div>;

        return (
          <>
            <UserInfo
              displayName={linkedPost.displayName}
              username={linkedPost.username}
              profileImage={post.linkedPost.profileImage}
            />
            <span className="ml-2 text-light italic">
              • 🔁 by {post.username}
            </span>
            <RenderText content={linkedPost.content} />
            <BottomButtons post={linkedPost} />
          </>
        );

      // Reply
      case PostType.REPLY:
        return (
          <>
            <UserInfo
              displayName={post.displayName}
              username={post.username}
              profileImage={post.profileImage}
            />
            <RenderText content={post.content} />
            <div className="rounded-lg border-green p-2 mt-1">
              {!linkedPost ? (
                <span className="text-light">Not found</span>
              ) : (
                <>
                  <UserInfo
                    displayName={linkedPost.displayName}
                    username={linkedPost.username}
                    profileImage={post.linkedPost.profileImage}
                    small={true}
                  />
                  <RenderText content={linkedPost.content} />
                </>
              )}
            </div>
            <BottomButtons post={post} />
          </>
        );
    }
  };

  // Post top info
  const UserInfo = (props: {
    displayName: string;
    username: string;
    profileImage: Image;
    small?: boolean;
  }) => (
    <>
      <Link to={`/profile/${props.username}`}>
        <img
          className={
            "inline-block rounded-full aspect-square " +
            (props.small ? "w-6 mr-1" : "w-14 absolute left-3 top-3")
          }
          src={
            "data:" +
              props.profileImage.mimeType +
              ";base64," +
              props.profileImage.data || "https://picsum.photos/50"
          }
        ></img>
      </Link>
      <Link to={`/profile/${props.username}`} className="h4 mr-1">
        {props.displayName}
      </Link>
      <span className="text-light">
        @{props.username} • {format(post.postedDate, "dd MMMM yyyy")}
      </span>
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
          onClick={() => handleLike(props.post)}
        >
          👍{likes}
        </button>
        {/* Replies */}
        <button
          className={"btn-icon w-16" + (hasReplied ? " activated" : "")}
          type="button"
          title="Reply"
          onClick={() => handleReply(props.post)}
        >
          ↪️{replies}
        </button>
        {/* Reposts */}
        <button
          className={"btn-icon w-16" + (hasReposted ? " activated" : "")}
          type="button"
          title="Repost"
          onClick={() => handleRepost(props.post)}
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
              onClick={() => handleDelete(props.post)}
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
    <div className="py-2 pl-20 pr-4 glass relative rounded-lg">
      <PostContent />
    </div>
  );
};

export default PostCard;
