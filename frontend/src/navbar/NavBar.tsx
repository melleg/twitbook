import { Link } from "react-router-dom";
import { useGlobalContext } from "../auth/GlobalContext";
import SearchBar from "../search/SearchBar";

const NavBar = () => {
  const { loggedIn, myUsername } = useGlobalContext();

  return (
    <>
      <nav className="sticky top-0 w-full z-10 px-4 flex justify-between gap-2 nav-bg text-white">
        {/* Left content */}
        <Link
          to="/"
          className="flex-grow basis-0 font-medium text-xl flex items-center"
        >
          twitbook
        </Link>
        {/* Middle content */}
        <div className="width-medium text-lg flex items-center justify-between gap-4">
          <Link className="font-medium text-xl" to="/">
            All Posts
          </Link>
          <SearchBar />
        </div>
        {/* Right content */}
        <div className="flex-grow basis-0 font-medium text-xl flex justify-end items-center gap-2">
          {loggedIn ? (
            <>
              <Link to={`/profile/${myUsername}`}>Profile</Link>
              <a href="">Logout</a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
