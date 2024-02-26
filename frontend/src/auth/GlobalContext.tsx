import { createContext, useContext } from "react";

export type GlobalContent = {
  loggedIn: boolean;
  username: string;
  setLoggedIn: (val: boolean) => void;
  setUsername: (val: string) => void;
};

export const MyGlobalContext = createContext<GlobalContent>({
  loggedIn: false, // default
  username: "",
  setLoggedIn: () => {},
  setUsername: () => {},
});

export const useGlobalContext = () => useContext(MyGlobalContext);
