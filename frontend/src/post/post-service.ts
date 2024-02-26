import { api } from "../base-api";
import Post from "./post";
import PostModel from "./post-model";

const uri = "posts";

export const getPosts = async () => {
  const posts = (await api.get<Post[]>(`${uri}`)).data;
  posts.forEach((p) => mapPost(p));
  return posts;
};

export const getPostsByUser = async (username: string) => {
  const posts = (await api.get<Post[]>(`${uri}/by-username/${username}`)).data;
  posts.forEach((p) => mapPost(p));
  return posts;
};

export const createPost = async (model: PostModel) => {
  return (await api.post(`${uri}`, model));
};

const mapPost = (p: Post) => {
  p.postedDate = new Date(p.postedDate);
  return p;
};
