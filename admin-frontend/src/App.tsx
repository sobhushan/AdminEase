import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <Router>
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/*" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;