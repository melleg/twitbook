import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <nav className="fixed top-0 w-full text-xl font-medium flex bg-black text-white">
        <Link to="/" className="p-3">Twitbook</Link>
        <Link to="/posts" className="p-3">Posts</Link>
        <Link to="/login" className="p-3">Login</Link>
        <Link to="/register" className="p-3">Register</Link>
      </nav>
    </>
  );
};

export default NavBar;
