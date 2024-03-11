export default interface User {
  username: string;
  registerDate: Date;
  hasFollowed: boolean;
  numberOfFollowers: number;
  numberOfFollowing: number;
}
