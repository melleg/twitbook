import { useState } from "react";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const clearInputFields = () => {
    setPassword("");
    setUsername("");
  };

  return (
    <form
      className="flex flex-col mx-auto gap-1 max-w-64 glass rounded-lg mt-4 p-4"
      onSubmit={(e) => {
        e.preventDefault();
        console.log(`username: ${username}`);
        console.log(`password: ${password}`);
        clearInputFields();
      }}
    >
      <h3>Login</h3>
      <span className="error-message">{errorMessage}</span>

      <label>
        Username
        <input
          className="block border-2 border-black"
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password
        <input
          className="block border-2 border-black"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit" className="btn-action">
        Login
      </button>
    </form>
  );
};

export default LoginComponent;
