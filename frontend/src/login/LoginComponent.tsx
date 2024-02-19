import { useState } from "react";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const clearInputFields = () => {
    setPassword("");
    setUsername("");
  };

  return (
    <div>
      <form
        className="flex flex-col gap-1 max-w-64"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(`username: ${username}`);
          console.log(`password: ${password}`);
          clearInputFields();
        }}
      >
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginComponent;
