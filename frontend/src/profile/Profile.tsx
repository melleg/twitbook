import { useEffect, useState } from "react";
import User from "./user";
import { useParams } from "react-router-dom";
import axios from "axios";

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
      setUser(
        (await axios.get<User>(`http://localhost:8080/api/v1/user/${id}`)).data
      );
    } catch {}

    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>{user ? <div>{user.username}</div> : <div>User not found</div>}</>
      )}
    </>
  );
}

export default Profile;
