import { api } from "../base-api";
import User from "./user";
import ProfileModel from "./profile-model";

const uri = "users";

export const getUsers = async () => {
  return (await api.get<User[]>(`${uri}`)).data;
};

export const getUserByUsername = async (username: string) => {
  return (await api.get<User>(`${uri}/by-username/${username}`)).data;
};

export const getFollowers = async (username: string) => {
  return (await api.get<User>(`${uri}/followers-by-username/${username}`)).data;
};

export const getFollowing = async (username: string) => {
  return (await api.get<User>(`${uri}/following-by-username/${username}`)).data;
};

export const followUser = async (followUsername: string) => {
  return (await api.post(`follows/user/${followUsername}`));
};

export const updateProfile = async (model: ProfileModel) => {
  return await api.patch(`${uri}/profile`, model);
};
