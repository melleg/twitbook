import { api } from "../base-api";
import User from "./user";
import usernameModel from "./username-model";

const uri = "users";

export const getUsers = async () => {
  return (await api.get<User[]>(`${uri}`)).data;
};

export const getUserByUsername = async (username: string) => {
  return (await api.get<User>(`${uri}/by-username/${username}`)).data;
};

export const followUser = async (followUsername: string) => {
  return (await api.post(`follows/user/${followUsername}`));
};

export const updateUsername = async (model: usernameModel) => {
  return await api.patch(`${uri}/username`, model);
};