import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.scss";

const Login = () => {
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    login();
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Connect to the world on Viraly. Get updates, and keep in touch with
            your family and friends.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
            <span className="mobile">
              Don't have an account?
              <Link to="/register" style={{ textDecoration: "none" }}>
                <span> Register</span>
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
