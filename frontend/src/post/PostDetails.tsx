import { useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();

  return <div>{id}</div>;
};

export default PostDetails;
