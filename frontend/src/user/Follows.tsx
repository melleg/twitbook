import { useState } from "react";
import { getFollowers, getFollowing } from "./user-service";
import UserFeed from "./UserFeed";
import { Link, useParams, useSearchParams } from "react-router-dom";

interface FollowsProps {
  showFollowers: boolean;
}

const Follows: React.FC<FollowsProps> = ({ showFollowers }) => {
  const [searchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState<number>(0);
  const { username } = useParams();

  const getPage = () => parseInt(searchParams.get("page") ?? "0");

  if (!username) return <div>User not found</div>;

  return (
    <>
      <div className="glass flex gap-2 py-2 pl-2 mt-2 rounded-lg text-left">
        <Link to={`/profile/${username}`} className="btn-tab-light">
          ← @{username}
        </Link>
        <Link
          to={`/profile/${username}/followers`}
          className={`btn-tab ${showFollowers ? "activated" : ""}`}
        >
          Followers
        </Link>
        <Link
          to={`/profile/${username}/following`}
          className={`btn-tab ${!showFollowers ? "activated" : ""}`}
        >
          Following
        </Link>
      </div>
      {showFollowers ? (
        <UserFeed
          getFunction={getFollowers(username, getPage(), setTotalPages)}
          totalPages={totalPages}
        />
      ) : (
        <UserFeed
          getFunction={getFollowing(username, getPage(), setTotalPages)}
          totalPages={totalPages}
        />
      )}
    </>
  );
};

export default Follows;
