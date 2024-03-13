import { useState } from "react";
import { useGlobalContext } from "../auth/GlobalContext";
import { updateBio, updateUsername } from "./user-service";
import UsernameModel from "./username-model";
import { useNavigate } from "react-router-dom";
import BioModel from "./bio-model";

const EditProfile = () => {
  const { myUsername } = useGlobalContext();
  const [newUsername, setUsernameInput] = useState<string>(myUsername);
  const [newBio, setNewBio] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // const usernameModel: UsernameModel = {
    //   newUsername,
    // };

    // try {
    //   //wip, needs to generate a new jwt i think
    //   await updateUsername(usernameModel);
    //   navigate(`/`);
    // } catch (err) {
    //   setErrorMessage("Unable to update profile");
    // }

    const bioModel: BioModel = {
        newBio,
      };
  
      try {
        await updateBio(bioModel);
        navigate(`/`);
      } catch (err) {
        setErrorMessage("Unable to update profile");
      }
  };

  return (
    <div className="p-4 bg-white rounded-md">
      <h1>Edit profile</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        {/* <label>
          Username
          <input
            className="block border-2 border-black"
            type="text"
            placeholder="username"
            value={newUsername}
            onChange={(e) => setUsernameInput(e.target.value)}
          />
        </label> */}

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
