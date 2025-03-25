// src/components/Sidebar.tsx
import { useState } from "react";
import "../styles/Login.css";

const Usersidebar = ({ onClose, onTabChange }: { onClose: () => void, onTabChange: (tab: string) => void }) => {
  const [activeTab, setActiveTab] = useState("all");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange(tab); // Notify parent (UserPage) of tab change
  };

  return (
    <div
      className="position-fixed top-0 start-0 vh-100 bg-dark text-white p-4"
      style={{ width: "250px", zIndex: 1000 }}
    >
      <button className="btn btn-light mb-4" onClick={onClose}>
        Close
      </button>

      <h4>Menu</h4>
      <ul className="list-unstyled">
        <li>
          <button
            className={`btn btn-link text-white ${activeTab === "all" ? "fw-bold" : ""}`}
            onClick={() => handleTabClick("all")}
          >
            All Designs
          </button>
        </li>
        <li>
          <button
            className={`btn btn-link text-white ${activeTab === "liked" ? "fw-bold" : ""}`}
            onClick={() => handleTabClick("liked")}
          >
            My Designs
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Usersidebar;

