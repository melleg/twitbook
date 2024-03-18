import { useGlobalContext } from "../auth/GlobalContext";
import { api } from "../base-api";
import Post from "./post";
import PostModel from "./post-model";

const uri = "posts";

export const getPostById = async (postId: number) => {
  const post = (await api.get<Post>(`${uri}/${postId}`)).data;
  return mapPost(post);
};

export const getPosts = async (page: number) => {
  const { setTotalPages } = useGlobalContext(); 
  const response = (await api.get(`${uri}?page=${page}`)).data;
  const posts = response.content;  
  setTotalPages(response.totalPages);
  posts.forEach((p: Post) => mapPost(p));
  return posts;
};

export const getPostsByUser = async (username: string, page: number) => {
  const posts = (await api.get<Post[]>(`${uri}/by-username/${username}?page=${page}`)).data;
  posts.forEach((p) => mapPost(p));
  return posts;
};


export const getPostsByFollowing = async (page: number) => {
  const posts = (await api.get<Post[]>(`${uri}/by-following?page=${page}`)).data;
  posts.forEach((p) => mapPost(p));
  return posts;
};


export const createPost = async (model: PostModel) => {
  return await api.post(`${uri}`, model);
};

export const likePost = async (postId: number) => {
  return await api.post<number>(`${uri}/like/${postId}`);
};

export const replyToPost = async (model: PostModel, replyPostId: number) => {
  return await api.post(`${uri}/reply/${replyPostId}`, model);
};

export const repost = async (postId: number) => {
  return await api.post(`${uri}/repost/${postId}`, null);
};

export const deletePost = async (postId: number) => {
  return await api.delete(`${uri}/${postId}`);
};

const mapPost = (p: Post) => {
  p.postedDate = new Date(p.postedDate);
  return p;
};
