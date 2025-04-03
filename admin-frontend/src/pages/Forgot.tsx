import { useState } from "react";
import "../styles/Forgot.css";

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

const Forgot = () => {
    const [countryCode, setCountryCode] = useState<string>("+91");
    const [phone, setPhone] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        localStorage.setItem("phone",phone);
        window.location.href="/otp-verification";
    }
    
  return (
    <div className="forgot-container vh-100 d-flex flex-column justify-content-center align-items-center">
      <h2>Find Your Account</h2>
      <div style={{ maxWidth: "400px", width: "100%" }}>
        <form onSubmit={handleSubmit}>
          <p>Please enter your credentials to retrieve your account</p>
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
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                  setPhone(numericValue);
                }}
                required
              />
            </div>
          </div>

          <button
            className="btn btn-dark w-100 mt-4"
            style={{ height: "50px", borderRadius: "25px" }}
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forgot;

