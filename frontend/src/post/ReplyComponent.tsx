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
  const { postReplyingId } = useGlobalContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!postReplyingId) return;

    if (!content || content.length === 0) {
      setErrorMessage("Please enter a twit");
      return;
    }

    const model: PostModel = {
      content,
    };

    try {
      await replyToPost(model, postReplyingId);
      onSubmit();
      setContent("");
    } catch (err) {
      setErrorMessage("Unable to post");
    }
  };

  return (
    <form className="p-4 glass rounded-lg gap-2 mt-2" onSubmit={handleSubmit}>
      <span className="error-message">{errorMessage}</span>
      <textarea
        className="p-2 glass rounded-lg w-5/6 border-solid border-gray-600"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit" className="btn-action ml-4">
        Reply
      </button>
    </form>
  );
};

export default ReplyComponent;
