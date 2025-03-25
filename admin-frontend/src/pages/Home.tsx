import { Link } from "react-router-dom";
import "../styles/Login.css"; 

const Home = () => {
  return (
    <div className="d-flex vh-100 flex-column flex-md-row">
      <div className="flex-fill bg-light d-none d-md-block"></div>

      <div className="d-flex align-items-center justify-content-center flex-column p-4 login-container" style={{ width: "500px" }}>
        <h2>Welcome to Our Platform</h2>
        <p className="text-center">some description</p>

        <div className="d-flex flex-column w-100" style={{ maxWidth: "370px" }}>
          <Link to="/login" className="btn btn-dark w-100 mb-2" style={{ height: "50px", borderRadius: "10px" }}>
            Login
          </Link>
          <Link to="/signup" className="btn btn-outline-dark w-100" style={{ height: "50px", borderRadius: "10px" }}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
