import "./update.scss";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { axiosInstance } from "../../axios";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Update = ({ setUpdateOpen }) => {
  const { currentUser } = useContext(AuthContext);

  const userQuery = useQuery(["user"], () =>
    axiosInstance.get(`/users/find/${currentUser.id}`).then((res) => {
      return res.data;
    })
  );

  const [name, setName] = useState(userQuery.data.name);
  const [username, setUsername] = useState(userQuery.data.username);
  const [email, setEmail] = useState(userQuery.data.email);
  const [city, setCity] = useState(userQuery.data.city);
  const [website, setWebsite] = useState(userQuery.data.website);
  const [coverPicFile, setCoverPicFile] = useState(null);
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [profilePic, setProfilePic] = useState(userQuery.data.profilePic);
  const [coverPic, setCoverPic] = useState(userQuery.data.coverPic);

  const queryClient = useQueryClient();

  // handle update request to mysql
  const mutation = useMutation(
    (updatedUser) => {
      return axiosInstance.put("/users", updatedUser);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  // handle user profile update
  const handleUpdate = (e) => {
    e.preventDefault();

    // upload profile picture
    if (profilePicFile) {
      // Upload file and metadata
      const storageRef = ref(
        storage,
        "images/" + currentUser.name + Date.now()
      );
      const uploadTask = uploadBytesResumable(storageRef, profilePicFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              return;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setProfilePic(downloadURL);
          });
        }
      );
    }

    // upload cover picture
    if (coverPicFile) {
      // Upload file and metadata
      const storageRef = ref(
        storage,
        "images/" + currentUser.name + Date.now()
      );
      const uploadTask = uploadBytesResumable(storageRef, coverPicFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              return;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setCoverPic(downloadURL);
          });
        }
      );
    }

    mutation.mutate({
      username,
      email,
      name,
      website,
      city,
      profilePic,
      coverPic,
    });
    setName("");
    setUsername("");
    setEmail("");
    setWebsite("");
    setCity("");
    setProfilePic("");
    setCoverPic("");
    setCoverPicFile(null);
    setProfilePic(null);
    setUpdateOpen(false);
  };

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
            <label>Username</label>
            <input
              type="text"
              placeholder={`${userQuery.data.name || ""}`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              onchange={(e) => setProfilePicFile(e.target.files[0])}
            />
          </div>
          <div className="row">
            <label>Cover Picture</label>
            <input
              type="file"
              name="profilePic"
              id="coverPic"
              accept="image/*"
              onchange={(e) => setCoverPicFile(e.target.files[0])}
            />
          </div>
          <button onClick={handleUpdate}>Update</button>
        </form>
      </div>
    </div>
  );
};

export default Update;
