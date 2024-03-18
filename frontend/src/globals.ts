export class Globals {
  public static ROLE_USER: string = "ROLE_USER";
  public static ROLE_ADMIN: string = "ROLE_ADMIN";
  public static USERNAME_PATTERN: string = "[\\w\\d_]{3,25}";
  public static HASHTAG_REGEX: RegExp = /(#(\w)+)/g;
  public static POST_MAX_LENGTH = 141;
}
