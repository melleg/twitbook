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

    console.log("pre-model");

    const model: PostModel = {
      content,
    };

    console.log("pre-try");

    try {
      await createPost(model);
      onSubmit();
      console.log("in try complete");
    } catch (err: any) {
      setErrorMessage(err.response.data);
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
