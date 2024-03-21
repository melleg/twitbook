import { Link } from "react-router-dom";
import { useGlobalContext } from "../auth/GlobalContext";
import SearchBar from "../search/SearchBar";

const NavBar = () => {
  const { loggedIn, myUsername } = useGlobalContext();

  return (
    <>
      <nav className="sticky top-0 w-full z-10 px-4 nav-bg text-white">
        <div className="width-medium mx-auto flex items-center justify-between gap-4">
          <div className="flex-grow basis-0">
            {/* Left content */}
            <Link to="/" className="font-medium text-xl flex items-center">
              twitbook
            </Link>
          </div>
          {/* Middle content */}
          <div className="basis-80 text-lg flex items-center justify-between gap-4">
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
        </div>
      </nav>
    </>
  );
};

export default NavBar;
