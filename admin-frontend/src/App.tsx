import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Userpage from './pages/Userpage';
import Admin from './pages/Admin';
import OTPVerification from './pages/Otpverification';

const App = () => {
  return (
    <Router>
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/otp-verification" element={<OTPVerification />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/userpage" element={<Userpage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/*" element={<Userpage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;