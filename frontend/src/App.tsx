import { Outlet } from "react-router-dom";
import NavBar from "./navbar/NavBar";
import { MyGlobalContext } from "./auth/GlobalContext";
import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

  return (
    <MyGlobalContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        myUsername: username,
        setMyUsername: setUsername,
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
