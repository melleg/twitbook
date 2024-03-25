import { FormEvent, useState } from "react";
import { updateProfile } from "./user-service";
import ProfileModel from "./profile-model";
import { useGlobalContext } from "../auth/GlobalContext";

const EditProfile: React.FC<ProfileModel> = ({ displayName, bio }) => {
  const { refresh, setRefresh, setMyProfileImage } = useGlobalContext();
  const [newDisplayName, setNewDisplayName] = useState<string>(displayName);
  const [newBio, setNewBio] = useState<string>(bio ?? "");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [newImage, setNewImage] = useState<Blob>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const model: ProfileModel = {
      displayName: newDisplayName,
      bio: newBio,
    };

    try {
      const newPfp = await updateProfile(model, newImage!);
      setMyProfileImage(newPfp.data);     
    } catch (err) {
      setErrorMessage("Unable to update profile");
    }

    setRefresh(refresh + 1);
    
  };

  const handleNewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    file.type.startsWith("image")
      ? setNewImage(file)
      : setErrorMessage("unsupported file type, please use an image");
  };

  return (
    <div className="p-4 bg-white rounded-md">
      <h1>Edit profile</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Profile image
          {newImage && (
            <div>
              <img className="h-48 w-48" src={URL.createObjectURL(newImage)} />
              <button
                className="btn-action"
                onClick={() => setNewImage(undefined)}
              >
                Remove
              </button>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            name="profileImage"
            onChange={(e) => {
              handleNewImage(e);
            }}
          />
        </label>
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
