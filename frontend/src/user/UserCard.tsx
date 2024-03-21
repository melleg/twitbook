import { format } from "date-fns";
import { Link } from "react-router-dom";
import User from "./user";

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div
      key={user.username}
      className="py-2 pl-4 pr-4 glass rounded-lg text-left text-light gap-2 flex "
    >
      <Link to={`/profile/${user.displayName}`}>
        <img
          className={
            "inline-block rounded-full aspect-square mr-1 w-14 left-3 top-3"
          }
          src="https://picsum.photos/50"
        ></img>
      </Link>
      <div className="flex flex-col justify-center">
        <div>
          <Link
            className="font-bold mr-1 text-black"
            to={`/profile/${user.displayName}`}
          >
            {user.displayName}
          </Link>
          @{user.username} • User since:{" "}
          {format(user.registerDate, "dd MMMM yyyy")}
        </div>
        {user.bio?.length > 0 && <p>"{user.bio}"</p>}
      </div>
    </div>
  );
};

export default UserCard;
