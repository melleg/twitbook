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

export const followUser = async (followUsername: string) => {
  return await api.post(`follows/user/${followUsername}`);
};

export const updateProfile = async (model: ProfileModel, image: Blob) => {
  const formData = new FormData();
  formData.append(
    "editUserModel", new Blob([JSON.stringify(model)], { type: "application/json" })
  );
  formData.append("file", image);
  return await api.patch(`${uri}/profile`, formData);
};
