import { Link } from "react-router-dom";
import "./register.scss";

const Register = () => {
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Viraly</h1>
          <p>
            Connect to the world on Viraly. Get updates, and keep in touch with
            your family and friends.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="text" placeholder="Name" />
            <button>Register</button>
            <span className="mobile">
              Already have an account?
              <Link to="/login" style={{ textDecoration: "none" }}>
                <span> Login</span>
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
