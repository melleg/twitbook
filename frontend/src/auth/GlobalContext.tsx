import { createContext, useContext } from "react";
import Post from "../post/post";

export type GlobalContent = {
  loggedIn: boolean;
  myUsername: string;
  roles: string[];
  postReplying: Post | null;
  setLoggedIn: (val: boolean) => void;
  setMyUsername: (val: string) => void;
  setRoles: (val: string[]) => void;
  setPostReplying: (val: Post) => void;
};

export const MyGlobalContext = createContext<GlobalContent>({
  loggedIn: false, // default
  myUsername: "",
  roles: [],
  postReplying: null,
  setLoggedIn: () => {},
  setMyUsername: () => {},
  setRoles: () => {},
  setPostReplying: () => {},
});

export const useGlobalContext = () => useContext(MyGlobalContext);
