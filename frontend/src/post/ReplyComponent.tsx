import { useState } from "react";
import { replyToPost } from "./post-service";
import { useGlobalContext } from "../auth/GlobalContext";
import PostModel from "./post-model";

interface ReplyComponentProps {
  onSubmit: () => void;
}

const ReplyComponent: React.FC<ReplyComponentProps> = ({ onSubmit }) => {
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { postReplying, setRefresh, refresh } = useGlobalContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!postReplying) return;

    if (!content || content.length === 0) {
      setErrorMessage("Please enter a reply");
      return;
    }

    const model: PostModel = {
      content,
    };

    try {
      await replyToPost(model, postReplying.id);
      onSubmit();
      setSubmitted(true);
      setRefresh(refresh + 1);
    } catch (err) {
      setErrorMessage("Unable to reply");
    }
  };

  return (
    <>
      {submitted ? (
        <div className="rounded-lg border-2 border-gray-500 p-2 mt-1">
          You replied "{content}"
        </div>
      ) : (
        <form className="gap-2 mt-2 flex flex-col" onSubmit={handleSubmit}>
          <span className="error-message">{errorMessage}</span>
          <textarea
            className="p-2 rounded-lg w-full"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit" className="btn-action ml-auto">
            Reply
          </button>
        </form>
      )}
    </>
  );
};

export default ReplyComponent;
