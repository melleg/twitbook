import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <nav className="sticky top-0 w-full text-xl font-medium flex bg-black text-white">
        <Link to="/" className="p-3">
          twitbook
        </Link>
        <Link to="/login" className="p-3 ml-auto">
          Login
        </Link>
        <Link to="/register" className="p-3">
          Register
        </Link>
      </nav>
    </>
  );
};

export default NavBar;
