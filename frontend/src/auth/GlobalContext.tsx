import { createContext, useContext } from "react";

export type GlobalContent = {
  loggedIn: boolean;
  myUsername: string;
  setLoggedIn: (val: boolean) => void;
  setMyUsername: (val: string) => void;
};

export const MyGlobalContext = createContext<GlobalContent>({
  loggedIn: false, // default
  myUsername: "",
  setLoggedIn: () => {},
  setMyUsername: () => {},
});

export const useGlobalContext = () => useContext(MyGlobalContext);
