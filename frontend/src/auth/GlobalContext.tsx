import { createContext, useContext } from "react";
import Post from "../post/post";

export type GlobalContext = {
  loggedIn: boolean;
  myUsername: string;
  roles: string[];
  postReplying: Post | null;
  refresh: number;
  setLoggedIn: (val: boolean) => void;
  setMyUsername: (val: string) => void;
  setRoles: (val: string[]) => void;
  setPostReplying: (val: Post | null) => void;
  setRefresh: (val: number) => void;
};

export const MyGlobalContext = createContext<GlobalContext>({
  loggedIn: false, // default
  myUsername: "",
  roles: [],
  postReplying: null,
  refresh: 0,
  setLoggedIn: () => {},
  setMyUsername: () => {},
  setRoles: () => {},
  setPostReplying: () => {},
  setRefresh: () => {},
});

export const useGlobalContext = () => useContext(MyGlobalContext);
