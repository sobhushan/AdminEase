// src/pages/Signup.tsx
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { CiUser } from "react-icons/ci";
import { RiHome4Line } from "react-icons/ri";
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

const Signup = () => {
  const [username, setUsername] = useState<string>("");
  const [searchParams] = useSearchParams();
  const phoneFromLogin = searchParams.get("phone") || "";
  const [phone, setPhone] = useState(phoneFromLogin);
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [countryCode, ] = useState<string>("+91");

  useEffect(() => {
    setPhone(phoneFromLogin); // Set pre-filled phone number
  }, [phoneFromLogin]);
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:3000/api/signup", {
        username,
        phone: phone,
        gender,
        address,
      });
  
      if (response.data.success) {
        alert("OTP has been sent to your mobile phone.");
        localStorage.setItem("phone", phone);  // Store phone for OTP verification
        window.location.href = "/otp-verification";
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed. Try again.');
    }
  };
  
  return (
    <div className="d-flex vh-100 flex-column flex-md-row">
      <div className="flex-fill bg-light d-none d-md-block"></div>
      
      <div className="d-flex align-items-center justify-content-center flex-column p-4 login-container" style={{ width: "500px" }}>
        <h2>Signup First</h2>

        <form onSubmit={handleSubmit} className="w-100" style={{maxWidth: "370px"}}>
        <p> Please enter the details to create your account</p>
          <div className="input-container position-relative mb-3 mt-4">
            <input type="text" className="form-control ps-5" style={{ height: "50px", borderRadius: "10px" }} placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} required />
            <label className="form-label">Full Name</label>
            <CiUser 
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

          <div className="input-container position-relative mb-3">
            <select className="form-select" style={{ height: "50px", borderRadius: "10px" }}
              value={gender} onChange={(e) => setGender(e.target.value)} required>
              <option className="form-label" value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="d-flex align-items-center mb-3" style={{ border: "1px solid #ced4da", borderRadius: "10px", overflow: "hidden", width: "100%", height: "50px" }}>
            <div className="position-relative">
              <select
                className="form-select border-0 custom-dropdown"
                value={countryCode}
                // onChange={(e) => setCountryCode(e.target.value)}
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
                disabled
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
                // onChange={(e) => {
                //   const numericValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                //   setPhone(numericValue);
                // }}
                disabled
              />
            </div>
          </div>

          <div className="input-container position-relative mb-3">
          <input
            type="text"
            className="form-control ps-5"
            style={{ height: "50px", borderRadius: "10px" }}
            placeholder="Address (Optional)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <RiHome4Line 
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
         

          {/* <div className="text-end">
            <a href="/login" className="text-decoration-none" style={{color:"rgba(69, 165, 225, 0.938)"}} >Already a user? Login</a>
          </div> */}

          <button className="btn btn-dark w-100 mt-4" style={{ height: "50px", borderRadius: "10px" }}>Send OTP</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;