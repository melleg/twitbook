import { useEffect, useState } from "react";
import User from "./user";
import { useParams, useSearchParams } from "react-router-dom";
import { followUser, getUserByUsername } from "./user-service";
import Feed from "../feed/Feed";
import { getPostsByUser } from "../post/post-service";
import { format } from "date-fns";
import CreatePostComponent from "../post/CreatePostComponent";
import { useGlobalContext } from "../auth/GlobalContext";
import EditProfile from "./EditProfile";
import Popup from "reactjs-popup";
import defaultImage from '/default.jpg'

function Profile() {
  const { username } = useParams();
  const [searchParams] = useSearchParams();
  const { loggedIn, myUsername, refresh } = useGlobalContext();
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [hasFollowed, setHasFollowed] = useState<boolean>(false);
  const [followers, setFollowers] = useState<number>(0);

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);

      try {
        const userResponse = await getUserByUsername(username!);
        setUser(userResponse);
        setHasFollowed(userResponse.hasFollowed);
        setFollowers(userResponse.numberOfFollowers);
        setErrorMessage("");
      } catch {
        setUser(null);
      }

      setLoading(false);
    };

    loadUser();
  }, [refresh, username, searchParams]);

  const getPage = () => {
    if (!searchParams) console.error("No search params!");
    return parseInt(searchParams.get("page") ?? "0");
  };

  const handleFollow = async () => {
    if (!loggedIn) {
      alert("You must be logged in to follow");
      return;
    }
    try {
      await followUser(username!);
      setFollowers(followers + (hasFollowed ? -1 : 1));
      setHasFollowed(!hasFollowed);
    } catch (err) {
      setErrorMessage("Could not follow user");
    }
  };

  // Loading
  if (loading) {
    return <p>Loading {username}...</p>;
  }

  // User not found
  if (!user) return <div>User not found</div>;

  // Profile
  return (
    <>
      <div className="glass rounded-lg mt-4 overflow-clip">
        {/* Background banner */}
        <div
          className="h-48 bg-cover"
          style={{
            backgroundImage: "url(https://picsum.photos/782/300)",
          }}
        ></div>
        {/* Username & follow */}
        <div className="px-4 py-2 flex flex-wrap gap-2 justify-between items-end">
          {/* Profile picture */}
          <img
            className="h-40 -mt-32 rounded-md aspect-square border-solid border-4 border-white"
            src={user.profileImage ? `data:${user.profileImage.mimeType};base64,${user.profileImage.data}` : defaultImage}
          ></img>
          {loggedIn && (username !== myUsername ? (
            <div>
              <p className="error-message">{errorMessage}</p>
              <button
                type="button"
                className="btn-action"
                onClick={() => handleFollow()}
              >
                {hasFollowed ? <div className="unfollow"></div> : "Follow"}
              </button>
            </div>
          ) : (
            <div>
              <Popup
                trigger={<button className="btn-action">Edit profile</button>}
                modal
                nested
              >
                <EditProfile displayName={user.displayName} bio={user.bio} />
              </Popup>
            </div>
          ))}
        </div>
        {/* Additional profile info */}
        <div className="px-4 pb-4">
          <h3>{user.displayName}</h3>
          <div className="text-light">
            <p>@{user.username}</p>
            <p>User since: {format(user.registerDate, "dd MMMM yyyy")}</p>
          </div>
          <p>{user.bio}</p>
          <p>Followers: {followers}</p>
          <p>Following: {user.numberOfFollowing}</p>
        </div>
      </div>

      {username === myUsername && <CreatePostComponent />}

      <Feed
        getFunction={getPostsByUser(user.username, getPage(), setTotalPages)}
        totalPages={totalPages}
      />
    </>
  );
}

export default Profile;
