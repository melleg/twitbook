import { Outlet } from "react-router-dom";
import NavBar from "./navbar/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default App;
