import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Userpage from './pages/Userpage';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <Router>
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/userpage" element={<Userpage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/*" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;