export class Globals {
  public static ROLE_USER: string = "ROLE_USER";
  public static ROLE_ADMIN: string = "ROLE_ADMIN";
  public static USERNAME_PATTERN: string = "[\\w\\d_]{3,25}";
  public static HASHTAG_REGEX: RegExp = /\B#(\w+|#)+\b/g;
  public static WORD_REGEX: RegExp = /[^ \n]+/g;
}
