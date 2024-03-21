import { Link } from "react-router-dom";
import { useGlobalContext } from "../auth/GlobalContext";
import SearchBar from "../search/SearchBar";

const NavBar = () => {
  const { loggedIn, myUsername } = useGlobalContext();

  return (
    <>
      <nav className="sticky top-0 w-full z-10 px-4 nav-bg text-white">
        <div className="width-medium mx-auto flex items-center justify-between gap-4">
          {/* Left content */}
          <div className="flex-grow basis-10 flex items-center">
            <Link to="/" className="w-8 flex-shrink-0">
              <img
                src="/public/favicon.ico"
                style={{ filter: "grayscale(0.4) brightness(1.7)" }}
              ></img>
            </Link>
          </div>
          {/* Middle content */}
          <SearchBar />
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
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
