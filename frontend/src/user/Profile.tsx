import { useEffect, useState } from "react";
import User from "./user";
import { useParams } from "react-router-dom";
import { followUser, getUserByUsername } from "./user-service";
import Feed from "../feed/Feed";
import { getPostsByUser } from "../post/post-service";
import { format } from "date-fns";
import CreatePostComponent from "../post/CreatePostComponent";
import { useGlobalContext } from "../auth/GlobalContext";

function Profile() {
  const { username } = useParams();
  const { myUsername } = useGlobalContext();

  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [hasFollowed, setHasFollowed] = useState<boolean>(false);

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);

      try {
        const userResponse = await getUserByUsername(username!)
        setUser(userResponse);
        setHasFollowed(userResponse.hasFollowed);
        setErrorMessage("");;
      } catch {
        setUser(null);
      }

      setLoading(false);
    };

    loadUser();
  }, [username]);
  
  const handleFollow = async () => {

    try {
      await followUser(username!);      
      setHasFollowed(!hasFollowed);   
    } catch (error: any) {
      setErrorMessage("Could not follow user");
    }

  };

  // Loading
  if (loading) return <p>Loading {username}...</p>;

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
            src="https://picsum.photos/200"
          ></img>
          {username !== myUsername && (
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
          )}
        </div>
        {/* Additional profile info */}
        <div className="px-4 pb-4">
          <h3>@{user.username}</h3>
          <p className="text-light">
            User since: {format(user.registerDate, "dd MMMM yyyy")}
          </p>
          <p>Followers: {user.followers}</p>
          <p>Following: {user.following}</p>
        </div>
      </div>

      {username === myUsername && <CreatePostComponent />}

      <Feed getFunction={getPostsByUser(user.username)} />
    </>
  );
}

export default Profile;
