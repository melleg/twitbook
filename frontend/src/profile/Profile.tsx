import { useEffect, useState } from "react";
import User from "./user";
import { useParams } from "react-router-dom";
import { getUserByUsername } from "./user-service";

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
              <img
                className="w-48 aspect-square"
                src="https://picsum.photos/200"
              ></img>
              <h3>{user.username}</h3>
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
