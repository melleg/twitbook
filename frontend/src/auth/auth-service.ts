import { api } from "../base-api";
import RegisterModel from "./register-model";

const uri = "auth";

export const register = async (model: RegisterModel) => {
  return (await api.post(`${uri}`, model)).data;
};
