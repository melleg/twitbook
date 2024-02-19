import { Outlet } from "react-router-dom";
import NavBar from "./navbar/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <div className="p-2">
        <Outlet />
      </div>
    </>
  );
}

export default App;
