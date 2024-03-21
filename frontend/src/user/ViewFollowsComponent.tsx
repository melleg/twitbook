import { useEffect, useState } from "react";
import User from "./user";
import { getFollowers, getFollowing } from "./user-service";
import UserCard from "./UserCard";
import { useGlobalContext } from "../auth/GlobalContext";

const ViewFollowsComponent: React.FC = () => {
  const [results, setResults] = useState<User[]>([]);
  const { refresh } = useGlobalContext();


  useEffect(() => {
    const requestHandler = async () => {
      // const followers = await getFollowers("sjaakie");
      const following = await getFollowing("sjaakie");
      setResults(following);
    };

    requestHandler();
  }, [refresh]);

  return (
    <div className="flex flex-col gap-3 mt-2 mb-4">
      {/* <button className="btn-action" onClick={requestHandler}>
        {" "}
        click me
      </button> */}
      {results.map((result) => (
        <UserCard user={result} />
      ))}
    </div>
  );
};

export default ViewFollowsComponent;
