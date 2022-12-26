import { useContext } from "react";
import { useQuery } from "react-query";
import "./comments.scss";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../axios";

const Comments = ({ postId }) => {
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["comments"], () =>
    axiosInstance.get(`/comments?postId=${postId}`).then((res) => {
      return res.data;
    })
  );

  return (
    <div className="comments">
      <div className="write">
        <img
          src={
            currentUser.profilePic ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZvmV2bdt-eITXhe_MeJMt4zKRHatRco1AgPedOFkdvQ&s"
          }
          alt=""
        />
        <input type="text" placeholder="write a comment" />
        <button>Send</button>
      </div>
      {data?.map((comment) => (
        <div className="comment" key={comment.id}>
          <img
            src={
              comment.profilePicture ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZvmV2bdt-eITXhe_MeJMt4zKRHatRco1AgPedOFkdvQ&s"
            }
            alt=""
          />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">1 hour ago</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
