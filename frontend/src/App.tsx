import { Outlet } from "react-router-dom";
import NavBar from "./navbar/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <div
        className="mx-auto text-lg"
        style={{
          width: "min(50rem, calc(100% - 20px))",
        }}
      >
        <Outlet />
      </div>
    </>
  );
}

export default App;
