import { useState } from "react";
import { useGlobalContext } from "../auth/GlobalContext";
import { updateUsername } from "./user-service";

const EditProfile = () => {
  const { myUsername } = useGlobalContext();
  const [usernameInput, setUsernameInput] = useState<string>(myUsername);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await updateUsername(usernameInput);
    } catch (err) {
      setErrorMessage("Unable to update profile");
    }
  };

  return (
    <div className="p-4 bg-white rounded-md">
      <h1>Edit profile</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Username
          <input
            className="block border-2 border-black"
            type="text"
            placeholder="username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
          />
        </label>
        <button className="btn-action" type="submit">
          Submit
        </button>
        <p>{errorMessage}</p>
      </form>
    </div>
  );
};

export default EditProfile;
