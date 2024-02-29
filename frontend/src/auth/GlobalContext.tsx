import { createContext, useContext } from "react";

export type GlobalContent = {
  loggedIn: boolean;
  myUsername: string;
  roles: string[];
  setLoggedIn: (val: boolean) => void;
  setMyUsername: (val: string) => void;
  setRoles: (val: string[]) => void;
};

export const MyGlobalContext = createContext<GlobalContent>({
  loggedIn: false, // default
  myUsername: "",
  roles: [],
  setLoggedIn: () => {},
  setMyUsername: () => {},
  setRoles: () => {},
});

export const useGlobalContext = () => useContext(MyGlobalContext);
