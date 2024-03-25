import { useState } from "react";
import PostModel from "./post-model";
import { createPost } from "./post-service";
import { useGlobalContext } from "../auth/GlobalContext";
import TextArea from "./TextArea";

const CreatePostComponent: React.FC = () => {
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { refresh, setRefresh } = useGlobalContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content || content.length === 0) {
      setErrorMessage("Please enter a twit");
      return;
    }

    const model: PostModel = {
      content,
    };

    try {
      await createPost(model);
      setContent("");
      setRefresh(refresh + 1); // Global refresh event
    } catch (err) {
      setErrorMessage("Unable to post");
    }
  };

  return (
    <form
      className="flex flex-col gap-2 my-2 relative"
      onSubmit={handleSubmit}
    >
      {errorMessage?.length > 0 && (
        <span className="error-message">{errorMessage}</span>
      )}

      <TextArea
        onChange={(e) => setContent(e.target.value)}
        value={content}
        placeholder="What're you twitting about?"
      />
      <button type="submit" className="btn-action absolute right-1 bottom-1">
        Post
      </button>
    </form>
  );
};

export default CreatePostComponent;
