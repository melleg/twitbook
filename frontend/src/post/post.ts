export default interface Post {
  id: number;
  content: string;
  postedDate: Date;
  username: string;
  type: PostType;
  likes: number;
  reposts: number;
  replies: number;
  hasLiked: boolean;
  hasReposted: boolean;
  hasReplied: boolean;
  linkedPost?: Post;
}

export enum PostType {
  POST = 0,
  REPOST = 1,
  REPLY = 2,
}
