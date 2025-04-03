// src/components/Usersidebar.tsx
import { useState } from "react";
import "../styles/Usersidebar.css";

const Usersidebar = ({ onClose, onTabChange }: { onClose: () => void; onTabChange: (tab: string) => void }) => {
  const [activeTab, setActiveTab] = useState("all");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange(tab); // Notify parent (UserPage) of tab change
  };

  return (
    <div className="sidebar position-fixed top-0 start-0 vh-100 bg-dark text-white p-4">
      <button className="btn-close btn-close-white mb-4" onClick={onClose} aria-label="Close"></button>
      
      <h4>Menu</h4>
      <ul>
        <li>
          <button
            className={`sidebar-button ${activeTab === "all" ? "fw-bold" : ""}`}
            onClick={() => handleTabClick("all")}
          >
            All Designs
          </button>
        </li>
        <li>
          <button
            className={`sidebar-button ${activeTab === "liked" ? "fw-bold" : ""}`}
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
