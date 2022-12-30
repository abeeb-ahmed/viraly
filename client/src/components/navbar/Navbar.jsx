import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Navbar = () => {
  const { toggleMode, darkMode } = useContext(DarkModeContext);
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/api/auth/logout");
      logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Viraly</span>
        </Link>
        <div className="icons">
          <HomeOutlinedIcon className="icon" onClick={() => navigate("/")} />

          {darkMode ? (
            <WbSunnyOutlinedIcon className="icon" onClick={toggleMode} />
          ) : (
            <DarkModeOutlinedIcon className="icon" onClick={toggleMode} />
          )}
          <LogoutIcon className="icon " onClick={handleLogout} />
          <GridViewOutlinedIcon className="icon mobile" />
        </div>
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon className="icon" />
        <EmailOutlinedIcon className="icon" />
        <NotificationsOutlinedIcon className="icon" />
        <Link
          to={`/profile/${currentUser.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="user">
            <img
              src={
                currentUser.profilePic ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZvmV2bdt-eITXhe_MeJMt4zKRHatRco1AgPedOFkdvQ&s"
              }
              alt=""
            />
            <span>{currentUser.name}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
