/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { login } from "./auth-service";
import LoginModel from "./login-model";
import { setJwtHeader } from "../base-api";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "./GlobalContext";

const LoginComponent = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setLoggedIn, setMyUsername, setRoles } = useGlobalContext();

  const navigate = useNavigate();

  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (err: any) {
      return null;
    }
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();

    if (usernameInput.length === 0 || passwordInput.length === 0)
      setErrorMessage("Please enter credentials");

    try {
      const loginModel: LoginModel = {
        username: usernameInput,
        password: passwordInput,
      };
      const jwt = await login(loginModel);
      const jwtParsed = parseJwt(jwt);
      if (!jwtParsed) throw new Error("JWT invalid");

      setJwtHeader(jwt);
      setLoggedIn(true);
      setMyUsername(jwtParsed.sub);
      setRoles(jwtParsed.roles.flatMap((r: any) => r.authority));
      
      navigate(`/profile/${jwtParsed.sub}`);
    } catch (err: any) {
      console.log(err);
      setErrorMessage(err.response?.data ?? err.message);
      setPasswordInput("");
    }
  };

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
          autoComplete="username"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
        />
      </label>
      <label>
        Password
        <input
          className="block border-2 border-black"
          type="password"
          placeholder="password"
          autoComplete="current-password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
      </label>
      <button type="submit" className="btn-action">
        Login
      </button>
    </form>
  );
};

export default LoginComponent;
