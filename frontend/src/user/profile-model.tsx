export default interface ProfileModel {
  displayName: string;
  bio: string;
  profileImage?: MediaSource | Blob | undefined;
}
