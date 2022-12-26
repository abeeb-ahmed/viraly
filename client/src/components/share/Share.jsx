import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { useMutation, useQueryClient } from "react-query";
import { axiosInstance } from "../../axios";

const Share = () => {
  const { currentUser } = useContext(AuthContext);

  const [desc, setDesc] = useState("");
  const [file, setFile] = useState("");
  const [img, setImg] = useState("");

  const queryClient = useQueryClient();

  // send post to db using react query
  const mutation = useMutation(
    (newPost) => {
      return axiosInstance.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
        setDesc("");
      },
    }
  );

  const handlePost = (e) => {
    e.preventDefault();
    if (file !== "") {
      // Create the file metadata
      /** @type {any} */
      const metadata = {
        contentType: "image/*",
      };

      // Upload file and metadata
      const storageRef = ref(
        storage,
        "images/" + currentUser.name + Date.now()
      );
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on(() => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImg(downloadURL);
        });
      });
      setFile("");
    }

    mutation.mutate({ desc, img });
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img src={currentUser.profilePic} alt="" />
          <input
            type="text"
            placeholder={`What's on your mind ${currentUser.name}?`}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={(e) => handlePost(e)}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
