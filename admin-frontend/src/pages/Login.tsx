// src/pages/Login.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Login.css";

const countryCodes = [
  { code: "+1", flag: "🇺🇸" },
  { code: "+91", flag: "🇮🇳" },
  { code: "+44", flag: "🇬🇧" },
  { code: "+61", flag: "🇦🇺" },
  { code: "+81", flag: "🇯🇵" },
  { code: "+49", flag: "🇩🇪" },
  { code: "+33", flag: "🇫🇷" },
  { code: "+55", flag: "🇧🇷" },
  { code: "+86", flag: "🇨🇳" },
  { code: "+7", flag: "🇷🇺" },
  { code: "+82", flag: "🇰🇷" },
  { code: "+39", flag: "🇮🇹" },
  { code: "+34", flag: "🇪🇸" },
];

const Login = () => {
  const [countryCode, setCountryCode] = useState<string>("+91");
  const [phone, setPhone] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [, setUserExists] = useState<boolean | null>(null);

  useEffect(() => {
    if (otpSent && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpSent, timeLeft]);

  const handleSendOtp = async () => {
    if (!phone) {
      alert("Please enter your phone number.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        phone: `${countryCode}${phone}`,
      });
  
      setUserExists(response.data.exists); 
  
      if (response.data.exists) {
        setOtpSent(true);
        setTimeLeft(30);
        alert("OTP Sent to your Phone Number!");
      } else {
        window.location.href = `/signup?phone=${encodeURIComponent(`${countryCode}${phone}`)}`;
      }
    } catch (error) {
      console.error("Error checking user:", error);
      alert("Error sending OTP. Please try again.");
    }
  };
  

  const handleResend = () => {
    setTimeLeft(30);
    alert("OTP Resent!");
  };

  const handleVerifyOtp = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!otp) {
      alert("Please enter the OTP.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        phone: `${countryCode}${phone}`,
        otp,
      });

      console.log("API Response:", response.data);

      if (response.data.exists) {
        if (!response.data.user_id) {
          console.error("Error: user_id is missing in API response");
          alert("Login failed. User ID not found.");
          return;
        }
        // Existing User - Redirect to dashboard
        localStorage.setItem("user_id", response.data.user_id);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("role", response.data.role);
        alert(response.data.message);

        window.location.href = response.data.role === "admin" ? "/admin" : "/userpage";
      } else {
        // New User - Redirect to signup
        window.location.href = `/signup?phone=${encodeURIComponent(`${phone}`)}`;
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
      alert("Invalid OTP. Try again.");
    }
  };

  return (
    <div className="d-flex vh-100 flex-column flex-md-row">
      <div className="flex-fill bg-light d-none d-md-block"></div>

      <div className="d-flex align-items-center justify-content-center flex-column p-4 login-container" style={{ width: "500px" }}>
        <h2>Login</h2>

        <form onSubmit={handleVerifyOtp} className="w-100" style={{ maxWidth: "370px" }}>
          <p>Please enter your phone number to login.</p>
          {/* <p>
            Are you a new user?{" "}
            <a href="/signup" className="text-decoration-none" style={{ color: "rgba(69, 165, 225, 0.938)", cursor: "pointer" }}>
              Signup
            </a>
          </p> */}

          {/* Phone Number Input */}
          <div className="d-flex align-items-center mb-3" style={{ border: "1px solid #ced4da", borderRadius: "10px", overflow: "hidden", width: "100%", height: "50px" }}>
            <div className="position-relative">
              <select
                className="form-select border-0 custom-dropdown"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                style={{
                  width: "100px",
                  height: "100%",
                  background: "#f8f9fa",
                  paddingRight: "25px",
                  appearance: "none",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.code}
                  </option>
                ))}
              </select>
              <span className="dropdown-arrow">▼</span>
            </div>
            <div className="input-container position-relative flex-grow-1">
              <input
                type="tel"
                className="form-control border-0"
                placeholder="Phone Number"
                style={{ height: "100%", borderRadius: "0" }}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                required
              />
            </div>
          </div>

          {/* OTP Input & Timer */}
          {otpSent ? (
            <>
              <div className="input-container position-relative mb-3">
                <input
                  type="text"
                  className="form-control pe-5 ps-5"
                  placeholder="Enter OTP"
                  style={{ height: "50px", borderRadius: "10px", paddingRight: "45px" }}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  maxLength={4}
                  required
                />
              </div>

              {/* Timer */}
              <p className="timer">{timeLeft > 0 ? `00:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}` : "00:00"}</p>

              {/* Resend OTP */}
              <p className="text-center resend">
                Didn't receive OTP?{" "}
                <span className={timeLeft === 0 ? "resend-link" : "disabled"} onClick={timeLeft === 0 ? handleResend : undefined}>
                  Resend
                </span>
              </p>

              {/* Verify OTP Button */}
              <button type="submit" className="btn btn-dark w-100 mt-3 mb-3" style={{ height: "50px", borderRadius: "10px" }}>
                Verify OTP
              </button>
            </>
          ) : (
            <button type="button" className="btn btn-dark w-100 mt-3 mb-3" style={{ height: "50px", borderRadius: "10px" }} onClick={handleSendOtp}>
              Continue 
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;






// import { useState } from "react";
// import { GoKey } from "react-icons/go";
// import { IoEyeOutline, IoEyeOffOutline} from "react-icons/io5";
// import { CiMail } from "react-icons/ci";
// import axios from "axios";
// import "../styles/Login.css"; 

// const Login = () => {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [showPassword, setShowPassword] = useState<boolean>(false);

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:3000/api/login", {
//         email,
//         password,
//       });
      
//       alert(response.data.message);
//       if (response.data.message.includes("Login successful")) {
//         localStorage.setItem("user_id", response.data.user_id);
//         localStorage.setItem("username", response.data.username);
//         localStorage.setItem("role", response.data.role);
//         // Redirect based on role
//         if (response.data.role === "admin") {
//           window.location.href = "/dashboard";
//         } else if (response.data.role === "user") {
//           window.location.href = "/userpage";
//         } else {
//           alert("Invalid role. Contact support.");
//         }
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Invalid credentials. Try again.");
//     }
//   };
//   return (
//     <div className="d-flex vh-100 flex-column flex-md-row">
//       <div className="flex-fill bg-light d-none d-md-block"></div>
      
//       <div className="d-flex align-items-center justify-content-center flex-column p-4 login-container" style={{ width: "500px" }}>
//         <h2>Welcome Back</h2>

//         <form onSubmit={handleSubmit} className="w-100" style={{maxWidth: "370px"}}>
//         <p> Please enter your credentials to log into your account</p>
//           <div className="input-container position-relative mb-3 mt-4">
//             <input type="email" className="form-control ps-5" style={{ height: "50px", borderRadius: "10px" }} placeholder="Email" 
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required/>
//             <label className="form-label">Email Address</label>
//             <CiMail 
//               className="position-absolute password-icon"
//               style={{
//                   top: "50%", 
//                   left: "20px",
//                   transform: "translateY(-50%)", 
//                   color: "#a9a5a5",
//                   fontSize: "18px"
//               }}
//             />
//           </div>

//           <div className="input-container mb-3 position-relative">
//             <input
//                 type={showPassword ? "text" : "password"}
//                 className="form-control ps-5"
//                 placeholder="Password"
//                 style={{ height: "50px", borderRadius: "10px", paddingRight:"40px" }}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//             />
//             <GoKey 
//                 className="position-absolute password-icon"
//                 style={{
//                     top: "50%", 
//                     left: "20px",
//                     transform: "translateY(-50%)", 
//                     color: "#a9a5a5",
//                     fontSize: "18px"
//                 }}
//             />
//             <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="position-absolute border-0 bg-transparent"
//                 style={{ top: "50%", right: "10px", transform: "translateY(-50%)", cursor: "pointer", color:"#a9a5a5" }}
//             >
//                 {showPassword ? <IoEyeOutline size={22} /> : <IoEyeOffOutline size={22} />}
//             </button>
//           </div>

//           <div className="text-end">
//             <a href="/signup" className="text-decoration-none" style={{color:"rgba(69, 165, 225, 0.938)"}} >Not a user? Signup here</a>
//           </div>

//           <button className="btn btn-dark w-100 mt-4" style={{ height: "50px", borderRadius: "10px" }}>Log In</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;