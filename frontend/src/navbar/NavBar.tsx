import { Link } from "react-router-dom";
import { useGlobalContext } from "../auth/GlobalContext";

const NavBar = () => {
  const { loggedIn, myUsername } = useGlobalContext();

  return (
    <>
      <nav className="sticky top-0 w-full z-10 text-xl font-medium flex bg-black text-white">
        <Link to="/" className="p-3 mr-auto">
          twitbook
        </Link>
        {loggedIn ? (
          <>
            <Link to={`/profile/${myUsername}`} className="p-3">
              Profile
            </Link>
            <a href="" className="p-3">
              Logout
            </a>
          </>
        ) : (
          <>
            <Link to="/login" className="p-3">
              Login
            </Link>
            <Link to="/register" className="p-3">
              Register
            </Link>
          </>
        )}
      </nav>
    </>
  );
};

export default NavBar;
