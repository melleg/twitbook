export default interface User {
  username: string;
  registerDate: Date;
  hasFollowed: boolean;
  followers: number;
  following: number;
}
