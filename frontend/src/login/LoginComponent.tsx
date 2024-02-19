import { useState } from "react";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const clearInputFields = () => {
    setPassword("");
    setUsername("");
  };

  return (
    <div className="pt-16 text-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(`username: ${username}`);
          console.log(`password: ${password}`);
          clearInputFields();
        }}
      >
        <label className="px-2">username: </label>
        <input
          className="border-2 border-black"
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="px-2">password: </label>
        <input
          className="border-2 border-black"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginComponent;
