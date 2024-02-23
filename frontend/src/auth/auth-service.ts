import { api } from "../base-api";
import LoginModel from "./login-model";
import RegisterModel from "./register-model";

const uri = "auth";

export const login = async (model: LoginModel) => {
  return (await api.post<string>(`${uri}/login`, model)).data;
};

export const register = async (model: RegisterModel) => {
  return (await api.post(`${uri}/register`, model)).data;
};