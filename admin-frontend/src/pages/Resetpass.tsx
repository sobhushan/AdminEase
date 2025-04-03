import { IoEyeOutline, IoEyeOffOutline} from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import "../styles/Resetpass.css"; 
import { useState } from "react";

const Resetpass = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showcPassword, setShowcPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [cpassword, setcPassword] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password === cpassword){
        alert("Password Reset Successfully!");
        setPassword("");
        setcPassword("");
        window.location.href="/login";
    }else{
        alert("password no match");
        setPassword("");
        setcPassword("");
    }
}


  return (
    <div>
    <div className="reset-container vh-100 d-flex flex-column justify-content-center align-items-center">
            <h2>Reset Password</h2>
            <div style={{ maxWidth: "400px", width: "100%" }}>
            <form onSubmit={handleSubmit}>
                <p className="mb-3">Please enter & confirm the new password for your account</p>
                <label className="form-label lab">New Password</label>
                <div className="input-container position-relative mb-3">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="form-control ps-5"
                        placeholder="Enter New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ height: "50px", borderRadius: "15px", paddingRight:"40px" }}
                        required
                    />
                    <CiLock
                        className="position-absolute password-icon"
                        style={{
                        top: "50%",
                        left: "20px",
                        transform: "translateY(-50%)",
                        color: "#a9a5a5",
                        fontSize: "20px",
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

                <label className="form-label lab">Confirm New Password</label>
                <div className="input-container position-relative mb-3 ">
                    <input
                        type={showcPassword ? "text" : "password"}
                        className="form-control ps-5"
                        placeholder="Confirm New Password"
                        value={cpassword}
                        onChange={(e) => setcPassword(e.target.value)}
                        style={{ height: "50px", borderRadius: "15px", paddingRight:"40px" }}
                        required
                    />
                    <CiLock 
                        className="position-absolute password-icon"
                        style={{
                            top: "50%", 
                            left: "20px",
                            transform: "translateY(-50%)", 
                            color: "#a9a5a5",
                            fontSize: "20px"
                        }}
                    />
                    <button
                        type="button"
                        onClick={() => setShowcPassword(!showcPassword)}
                        className="position-absolute border-0 bg-transparent"
                        style={{ top: "50%", right: "10px", transform: "translateY(-50%)", cursor: "pointer", color:"#a9a5a5" }}
                    >
                        {showcPassword ? <IoEyeOutline size={22} /> : <IoEyeOffOutline size={22} />}
                    </button>
                </div>
    
                <button
                className="btn btn-dark w-100 mt-4"
                style={{ height: "50px", borderRadius: "25px" }}
                >
                Update
                </button>
            </form>
            </div>
        </div>
    </div>
  )
}

export default Resetpass;