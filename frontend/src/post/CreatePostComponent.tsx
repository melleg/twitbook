import { useState } from "react";
import PostModel from "./post-model";
import { createPost } from "./post-service";

interface CreatePostProps {
  onSubmit: () => void;
}

const CreatePostComponent: React.FC<CreatePostProps> = ({ onSubmit }) => {
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: any) => {
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
      onSubmit();
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
  };

  return (
    <form className="p-4 glass rounded-lg gap-2" onSubmit={handleSubmit}>
      <span className="error-message">{errorMessage}</span>
      <input
        className="p-4 glass rounded-lg"
        type="text"
        placeholder="What're you twitting about?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit" className="btn-action">
        Post
      </button>
    </form>
  );
};

export default CreatePostComponent;
