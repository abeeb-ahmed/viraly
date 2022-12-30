import "./update.scss";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useQuery } from "react-query";
import { axiosInstance } from "../../axios";

const Update = ({ setUpdateOpen }) => {
  const { currentUser } = useContext(AuthContext);

  const userQuery = useQuery(["user"], () =>
    axiosInstance.get(`/users/find/${currentUser.id}`).then((res) => {
      return res.data;
    })
  );

  const { name, setName } = useState(userQuery.data.name);
  const { email, setEmail } = useState(userQuery.data.email);
  const { city, setCity } = useState(userQuery.data.city);
  const { website, setWebsite } = useState(userQuery.data.website);
  const { coverPicFile, setCoverPicFile } = useState(null);
  const { profilePicFile, setProfilePicFile } = useState(null);
  const { profilePic, setProfilePic } = useState(userQuery.data.profilePic);
  const { coverPic, setCoverPic } = useState(userQuery.data.coverPic);

  return (
    <div className="update">
      <div className="container">
        <h2>Update</h2>
        <CloseIcon className="close" onClick={() => setUpdateOpen(false)} />

        <form action="post">
          <div className="row">
            <label>Name</label>
            <input
              type="text"
              placeholder={`${userQuery.data.name || ""}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="row">
            <label>Email</label>
            <input
              type="text"
              placeholder={`${userQuery.data.email || ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="row">
            <label>City</label>
            <input
              type="text"
              placeholder={`${userQuery.data.city || ""}`}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="row">
            <label>Website</label>
            <input
              type="text"
              placeholder={`${userQuery.data.website || ""}`}
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div className="row">
            <label>Profile Picture</label>
            <input
              type="file"
              name="profilePic"
              id="profilePic"
              accept="image/*"
            />
          </div>
          <div className="row">
            <label>Cover Picture</label>
            <input
              type="file"
              name="profilePic"
              id="coverPic"
              accept="image/*"
            />
          </div>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default Update;
