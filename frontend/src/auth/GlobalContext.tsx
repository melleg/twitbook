import { createContext, useContext } from "react";

export type GlobalContent = {
  loggedIn: boolean;
  myUsername: string;
  roles: string[];
  postReplyingId: number | null;
  setLoggedIn: (val: boolean) => void;
  setMyUsername: (val: string) => void;
  setRoles: (val: string[]) => void;
  setPostReplyingId: (val: number) => void;
};

export const MyGlobalContext = createContext<GlobalContent>({
  loggedIn: false, // default
  myUsername: "",
  roles: [],
  postReplyingId: null,
  setLoggedIn: () => {},
  setMyUsername: () => {},
  setRoles: () => {},
  setPostReplyingId: () => {},
});

export const useGlobalContext = () => useContext(MyGlobalContext);
