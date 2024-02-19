import { useEffect, useState } from "react";
import User from "./user";
import { useParams } from "react-router-dom";
import { getUserByUsername } from "./user-service";
import Feed from "../feed/Feed";

function Profile() {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    setLoading(true);

    try {
      setUser(await getUserByUsername(id!));
    } catch {
      setUser(null);
    }

    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <p>Loading {id}...</p>
      ) : (
        <>
          {user ? (
            <div>
              {/* Background banner */}
              <div
                className="h-48"
                style={{
                  backgroundImage: "url(https://picsum.photos/782/300)",
                }}
              ></div>
              {/* Username & follow */}
              <div className="px-4 py-2 flex justify-between items-end">
                {/* Profile picture */}
                <img
                  className="h-40 -mt-32 rounded-md aspect-square border-solid border-4 border-white"
                  src="https://picsum.photos/200"
                ></img>
                <button>Follow</button>
              </div>
              {/* Additional profile info */}
              <div className="px-4 pb-4">
                <h3>@{user.username}</h3>
                <p className="text-light">User since: xxx</p>
              </div>

              <Feed />
            </div>
          ) : (
            <div>User not found</div>
          )}
        </>
      )}
    </>
  );
}

export default Profile;
