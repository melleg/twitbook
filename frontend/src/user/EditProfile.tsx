import { useState } from "react";
import { updateProfile } from "./user-service";
import ProfileModel from "./profile-model";

const EditProfile = (props: any) => {
  const [newDisplayName, setNewDisplayName] = useState<string>(
    props.displayName
  );
  const [newBio, setNewBio] = useState<string>(props.bio ? props.bio : "");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const model: ProfileModel = {
      newDisplayName,
      newBio,
    };

    try {
      //wip, needs to generate a new jwt i think
      await updateProfile(model);
    } catch (err) {
      setErrorMessage("Unable to update profile");
    }

    props.setUpdate(props.update + 1);
  };

  return (
    <div className="p-4 bg-white rounded-md">
      <h1>Edit profile</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Display Name:
          <input
            className="block border-2 border-black"
            type="text"
            placeholder="display name"
            value={newDisplayName}
            onChange={(e) => setNewDisplayName(e.target.value)}
          />
        </label>
        <label>
          Bio
          <textarea
            className="block border-2 border-black"
            placeholder="bio"
            value={newBio}
            onChange={(e) => setNewBio(e.target.value)}
          />
        </label>
        <button className="btn-action mt-1" type="submit">
          Submit
        </button>
        <p>{errorMessage}</p>
      </form>
    </div>
  );
};

export default EditProfile;
