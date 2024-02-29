import { Outlet } from "react-router-dom";
import NavBar from "./navbar/NavBar";
import { MyGlobalContext } from "./auth/GlobalContext";
import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [myUsername, setMyUsername] = useState<string>("");
  const [roles, setRoles] = useState<string[]>([]);
  const [postReplyingId, setPostReplyingId] = useState<number | null>(null);

  return (
    <MyGlobalContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        myUsername,
        setMyUsername,
        roles,
        setRoles,
        postReplyingId,
        setPostReplyingId,
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
