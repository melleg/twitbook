import { Outlet } from "react-router-dom";
import NavBar from "./navbar/NavBar";
import { MyGlobalContext } from "./auth/GlobalContext";
import { useState } from "react";
import Post from "./post/post";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [myUsername, setMyUsername] = useState<string>("");
  const [roles, setRoles] = useState<string[]>([]);
  const [postReplying, setPostReplying] = useState<Post | null>(null);
  const [refresh, setRefresh] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  return (
    <MyGlobalContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        myUsername,
        setMyUsername,
        roles,
        setRoles,
        postReplying,
        setPostReplying,
        refresh,
        setRefresh,
        page,
        setPage,
        totalPages,
        setTotalPages,
      }}
    >
      <NavBar />
      <div
        className="mx-auto text-lg"
        style={{
          width: "min(50rem, calc(100% - 20px))",
        }}
      >
        <Outlet />
      </div>
    </MyGlobalContext.Provider>
  );
}

export default App;
