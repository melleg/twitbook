import { Link } from "react-router-dom";
import { useGlobalContext } from "../auth/GlobalContext";
import SearchBar from "../search/SearchBar";

const NavBar = () => {
  const { loggedIn, myUsername, setRefresh, refresh } = useGlobalContext();

  return (
    <>
      <nav className="sticky top-0 w-full z-10 text-xl font-medium flex nav-bg text-white">
        <Link to="/" className="p-3 mr-auto" onClick={() => setRefresh(refresh + 1)}>
          twitbook
        </Link>
        <SearchBar />
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
