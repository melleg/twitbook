import { useState } from "react";

const EditProfile = () => {
  const [usernameInput, setUsernameInput] = useState("");
  return (
    <div className="p-4 bg-white rounded-md">
      <h1>Edit profile</h1>
      <form onSubmit={(e) => e.preventDefault()}>
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
      </form>
    </div>
  );
};

export default EditProfile;
