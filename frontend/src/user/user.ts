import Image from "./image";

export default interface User {
  username: string;
  registerDate: Date;
  hasFollowed: boolean;
  numberOfFollowers: number;
  numberOfFollowing: number;
  bio: string;
  displayName: string;
  profileImage: Image;
}