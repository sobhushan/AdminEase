// src/pages/Login.tsx
import { useState } from "react";
import { GoKey } from "react-icons/go";
import { IoEyeOutline, IoEyeOffOutline} from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import "../styles/Login.css"; 

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    window.location.href="/dashboard";
  }
  return (
    <div className="d-flex vh-100 flex-column flex-md-row">
      <div className="flex-fill bg-light d-none d-md-block"></div>
      
      <div className="d-flex align-items-center justify-content-center flex-column p-4 login-container" style={{ width: "500px" }}>
        <h2>Welcome Back</h2>

        <form onSubmit={handleSubmit} className="w-100" style={{maxWidth: "370px"}}>
        <p> Please enter your credentials to log into your account</p>
          <div className="input-container position-relative mb-3 mt-4">
            <input type="email" className="form-control ps-5" style={{ height: "50px", borderRadius: "10px" }} placeholder="Email" />
            <label className="form-label">Email Address</label>
            <CiMail 
              className="position-absolute password-icon"
              style={{
                  top: "50%", 
                  left: "20px",
                  transform: "translateY(-50%)", 
                  color: "#a9a5a5",
                  fontSize: "18px"
              }}
            />
          </div>

          <div className="input-container mb-3 position-relative">
            <input
                type={showPassword ? "text" : "password"}
                className="form-control ps-5"
                placeholder="Password"
                style={{ height: "50px", borderRadius: "10px", paddingRight:"40px" }}
            />
            <GoKey 
                className="position-absolute password-icon"
                style={{
                    top: "50%", 
                    left: "20px",
                    transform: "translateY(-50%)", 
                    color: "#a9a5a5",
                    fontSize: "18px"
                }}
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="position-absolute border-0 bg-transparent"
                style={{ top: "50%", right: "10px", transform: "translateY(-50%)", cursor: "pointer", color:"#a9a5a5" }}
            >
                {showPassword ? <IoEyeOutline size={22} /> : <IoEyeOffOutline size={22} />}
            </button>
          </div>

          <div className="text-end">
            <a href="/forgot" className="text-decoration-none" style={{color:"rgba(69, 165, 225, 0.938)"}} >Forgot Password?</a>
          </div>

          <button className="btn btn-dark w-100 mt-4" style={{ height: "50px", borderRadius: "10px" }}>Log In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;