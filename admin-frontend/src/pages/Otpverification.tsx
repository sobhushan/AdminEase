import "../styles/Otpver.css";
import { useEffect, useState} from "react";

const OTPVerification = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60); 
  const phone = localStorage.getItem("phone");

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const handleChange = (index: number, value: string, event: any) => {
    if (!/^\d?$/.test(value)) return; 
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
        event.target.nextElementSibling?.focus();
      }

      if (newOtp.join("").length === 4) {
        setTimeout(() => handleSubmit(newOtp.join("")), 10);
      }
  };

  
  const handleSubmit = async (enteredOtp: string) => {

    if (enteredOtp === "1234") {
      alert("OTP Verified Successfully!");
      window.location.href = "/userpage";
    } else {
      alert("Invalid OTP. Try Again!");
      setOtp(["", "", "", ""]);
      document.getElementById("otp-0")?.focus();
      return;
    }
    
  };

  const handleResend = () => {
    setOtp(["", "", "", ""]);
    setTimeLeft(60);
    document.getElementById("otp-0")?.focus();
  };

  const handleKeyDown = (index: number, e: any) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };  

  return (
    <div className="otp-container">
      <h2>OTP Verification</h2>
      <p>Please enter the one-time 4-digit code sent to</p>
      <p className="email">{phone}</p>

      <div className="otp-inputs">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
          />
        ))}
      </div>

      <p className="timer">{timeLeft > 0 ? `00:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}` : "00:00"}</p>

      <p className="resend">
        Didn't receive OTP?{" "}
        <span className={timeLeft === 0 ? "resend-link" : "disabled"} onClick={timeLeft === 0 ? handleResend : undefined}>
          Resend
        </span>
      </p>
    </div>
  );
};

export default OTPVerification;
