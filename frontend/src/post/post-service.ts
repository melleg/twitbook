import { api } from "../base-api";
import Post from "./post";

const uri = "posts";

export const getPosts = async () => {
  return (await api.get<Post[]>(`${uri}`)).data;
};

export const getPostsByUser = async (username: string) => {
  return (await api.get<Post[]>(`${uri}/by-username/${username}`)).data;
};

export const deletePost = async (postId: number) => {
  return (await api.delete<number>(`${uri}/${postId}`)).status;
};
