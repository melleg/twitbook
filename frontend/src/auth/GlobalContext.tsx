import { createContext, useContext } from "react";
import Post from "../post/post";
import Image, { emptyImage } from "../user/image";

export type GlobalContext = {
  loggedIn: boolean;
  myUsername: string;
  myProfileImage: Image;
  roles: string[];
  postReplying: Post | null;
  refresh: number;
  setLoggedIn: (val: boolean) => void;
  setMyUsername: (val: string) => void;
  setMyProfileImage: (val: Image) => void
  setRoles: (val: string[]) => void;
  setPostReplying: (val: Post | null) => void;
  setRefresh: (val: number) => void;
};

export const MyGlobalContext = createContext<GlobalContext>({
  loggedIn: false, // default
  myUsername: "",
  myProfileImage: emptyImage,
  roles: [],
  postReplying: null,
  refresh: 0,
  setLoggedIn: () => {},
  setMyUsername: () => {},
  setMyProfileImage: () => {},
  setRoles: () => {},
  setPostReplying: () => {},
  setRefresh: () => {},
});

export const useGlobalContext = () => useContext(MyGlobalContext);
