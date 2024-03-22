import { useEffect, useState } from "react";
import PaginationControls from "../misc/PaginationControls";
import User from "./user";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import defaultImage from "/default.jpg"

interface FeedProps {
  getFunction: Promise<User[]>;
  totalPages: number;
}

const UserFeed: React.FC<FeedProps> = ({ getFunction, totalPages }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setUsers(await getFunction);
      setLoading(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getFunction]);

  const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className="flex flex-col gap-2 py-2">{children}</div>;
  };

  // Loading
  if (loading)
    return (
      <Body>
        <span>Loading</span>
      </Body>
    );

  // No posts found
  if (users.length === 0)
    return (
      <Body>
        <div className="glass rounded-lg p-4">No users found</div>
      </Body>
    );

  // Posts
  return (
    <>
      <Body>
        {users.map((user) => (
          <div
            key={user.username}
            className="py-2 pl-4 pr-4 glass rounded-lg text-left text-light gap-2 flex "
          >
            <Link to={`/profile/${user.displayName}`}>
              <img
                className={
                  "inline-block rounded-full aspect-square mr-1 w-14 left-3 top-3"
                }
                src={
                  user.profileImage ? `data:${user.profileImage.mimeType};base64,${user.profileImage.data}` : defaultImage
                }
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
        ))}
      </Body>
      <PaginationControls totalPages={totalPages} />
    </>
  );
};

export default UserFeed;
