import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { toggleMode, darkMode } = useContext(DarkModeContext);
  const currentUser = {
    id: "1",
    name: "Jane Doe",
    profilePic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP4Muy_Z2IIkQznvhyZkrn-NWsnURAlW1Nq-xK4AE&s",
  };

  console.log(darkMode);

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Viraly</span>
        </Link>
        <div className="icons">
          <HomeOutlinedIcon className="icon" />
          {darkMode ? (
            <WbSunnyOutlinedIcon className="icon" onClick={toggleMode} />
          ) : (
            <DarkModeOutlinedIcon className="icon" onClick={toggleMode} />
          )}
          <GridViewOutlinedIcon className="icon" />
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
        <div className="user">
          <img src={currentUser.profilePic} alt="" />
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
