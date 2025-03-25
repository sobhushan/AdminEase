import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import Usersidebar from "../components/Usersidebar";
import "../styles/Login.css"; 

const UserPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    fetchDesigns();
  }, [activeTab]);

  const fetchDesigns = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      const endpoint =
        activeTab === "all"
          ? "http://localhost:3000/api/alldesign"
          : `http://localhost:3000/api/userdesign?user_id=${userId}`;

      const response = await axios.get(endpoint);
      setDesigns(response.data);
    } catch (error) {
      console.error("Error fetching designs:", error);
    }
  };

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      {sidebarOpen && (
        <Usersidebar 
          onClose={() => setSidebarOpen(false)} 
          onTabChange={setActiveTab} 
        />
      )}

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <button
          className="btn btn-dark"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{ position: "absolute", top: "20px", left: "20px" }}
        >
          <GiHamburgerMenu size={24} />
        </button>

        <h2 className="mt-5">Welcome to Your Design Dashboard</h2>
        <p>Viewing: <strong>{activeTab === "all" ? "All Designs" : "My Designs"}</strong></p>

        {/* Designs Grid */}
        <div className="row">
          {designs.length > 0 ? (
            designs.map((design: any) => (
              <div key={design.id} className="col-md-4 mb-4">
                <div className="card">
                  <img src={design.image} alt={design.name} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{design.name}</h5>
                    <p className="card-text">{design.description}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No designs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;

