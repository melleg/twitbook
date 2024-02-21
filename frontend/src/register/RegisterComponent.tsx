import { useState } from "react";

const RegisterComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  return (
    <div className=" text-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label className="px-2">Enter username: </label>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="px-2">Enter password: </label>
        <input
          type="text"
          placeholder="password"
          onChange={(e) => setCheckPassword(e.target.value)}
        />
        <label className="px-2">Re-enter password: </label>
        <input
          type="text"
          placeholder="re-enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterComponent;
