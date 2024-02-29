import { useState } from "react";
import { register } from "./auth-service";
import RegisterModel from "./register-model";
import { useNavigate } from "react-router-dom";

const RegisterComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!password || password.length === 0) {
      setErrorMessage("Please enter a password");
      return;
    }

    if (checkPassword !== password) {
      setErrorMessage("Passwords must be equal");
      return;
    }

    const model: RegisterModel = {
      username,
      password,
    };

    try {
      await register(model);
      navigate("success");
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
  };

  return (
    <form
      className="flex flex-col mx-auto gap-1 max-w-64 glass rounded-lg mt-4 p-4"
      onSubmit={handleSubmit}
    >
      <h3>Register</h3>
      <span className="error-message">{errorMessage}</span>
      <label>
        Username
        <input
          className="block border-2 border-black"
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password
        <input
          className="block border-2 border-black"
          type="password"
          placeholder="password"
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
        Re-enter password
        <input
          className="block border-2 border-black"
          type="password"
          placeholder="re-enter password"
          autoComplete="new-password"
          onChange={(e) => setCheckPassword(e.target.value)}
        />
      </label>
      <button type="submit" className="btn-action">
        Register
      </button>
    </form>
  );
};

export default RegisterComponent;
