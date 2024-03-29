import { Outlet } from "react-router-dom";
import NavBar from "./navbar/NavBar";
import { MyGlobalContext } from "./auth/GlobalContext";
import { useState } from "react";
import Post from "./post/post";
import Image, { emptyImage } from "./user/image";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [myUsername, setMyUsername] = useState<string>("");
  const [myProfileImage, setMyProfileImage] = useState<Image>(emptyImage);
  const [roles, setRoles] = useState<string[]>([]);
  const [postReplying, setPostReplying] = useState<Post | null>(null);
  const [refresh, setRefresh] = useState<number>(0);

  return (
    <MyGlobalContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        myUsername,
        setMyUsername,
        myProfileImage,
        setMyProfileImage,
        roles,
        setRoles,
        postReplying,
        setPostReplying,
        refresh,
        setRefresh,
      }}
    >
      <NavBar />
      <div className="mx-auto text-lg width-medium">
        <Outlet />
      </div>
    </MyGlobalContext.Provider>
  );
}

export default App;
