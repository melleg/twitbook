export default interface Post {
  id: number;
  content: string;
  postedDate: Date;
  username: string;
  type: PostType;
  linkedPost?: Post;
  hasReposted: boolean;
  hasLiked: boolean;
}

export enum PostType {
  POST = 0,
  REPOST = 1,
  REPLY = 2,
}
