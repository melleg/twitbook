import { useState } from "react";
import PostModel from "./post-model";
import { createPost } from "./post-service";
import { useGlobalContext } from "../auth/GlobalContext";

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
    <form className="p-4 glass rounded-lg gap-2 mt-2" onSubmit={handleSubmit}>
      <span className="error-message">{errorMessage}</span>
      <textarea
        className="p-2 glass rounded-lg w-5/6 border-solid border-gray-600"
        placeholder="What're you twitting about?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit" className="btn-action ml-4">
        Post
      </button>
    </form>
  );
};

export default CreatePostComponent;
