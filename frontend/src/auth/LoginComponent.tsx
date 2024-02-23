/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { login } from "./auth-service";
import LoginModel from "./login-model";
import { setJwtHeader } from "../base-api";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();   

    if(username.length === 0 || password.length === 0)
      setErrorMessage("Please enter credentials");

    try {
      const loginModel: LoginModel = {
        username,
        password
      };
      const jwt = await login(loginModel);
      setJwtHeader(jwt);
      navigate(`/profile/${username}`);
    }
    catch (err: any) {
      console.log(err);
      setErrorMessage(err.response.data);
      setPassword("");
    }
  }

  return (
    <form
      className="flex flex-col mx-auto gap-1 max-w-64 glass rounded-lg mt-4 p-4"
      onSubmit={handleLogin}
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
