import { useState } from "react";
import { useGlobalContext } from "../auth/GlobalContext";
import { updateProfile } from "./user-service";
import { useNavigate } from "react-router-dom";
import ProfileModel from "./profile-model";

const EditProfile = (props: any) => {
  const { myUsername } = useGlobalContext();
  const [newUsername, setUsernameInput] = useState<string>(myUsername);
  const [newBio, setNewBio] = useState<string>(props.bio ? props.bio : "");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const model: ProfileModel = {
      newUsername,
      newBio,
    };

    try {
      //wip, needs to generate a new jwt i think
      await updateProfile(model);
      navigate(`/`);
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
            value={newUsername}
            onChange={(e) => setUsernameInput(e.target.value)}
          />
        </label>

        <label>
          Bio
          <input
            className="block border-2 border-black"
            type="textarea"
            placeholder="bio"
            value={newBio}
            onChange={(e) => setNewBio(e.target.value)}
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
