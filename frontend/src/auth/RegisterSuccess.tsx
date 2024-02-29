import { Link } from "react-router-dom";

const RegisterSuccess = () => {
  return (
    <div className="flex flex-col mx-auto gap-1 max-w-64 glass rounded-lg mt-4 p-4">
      <h3>Success!</h3>
      <p>You can now log into the website.</p>
      <Link className="btn-action" to="/login">
        Go to login
      </Link>
    </div>
  );
};

export default RegisterSuccess;
