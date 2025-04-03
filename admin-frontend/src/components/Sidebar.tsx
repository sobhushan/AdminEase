import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaRegCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }: { isOpen: boolean, toggleSidebar: () => void }) => {
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({
    design: false,
    users: false,
    support: false
  });

  const toggleDropdown = (key: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <span className="logo">Aura & Arbor</span>
          <span className="admin-text">Admin Panel</span>
        </div>
        <button className="toggle-btn" onClick={toggleSidebar}><IoIosArrowBack /></button>
      </div>
      <ul className="menu">
        <li>
        <NavLink to="/admin" className={({ isActive }) => (isActive ? "active" : "")}>
          <FaRegCircle /> Dashboard
        </NavLink>
        </li>
        <hr />
        <li className="dropdown" onClick={() => toggleDropdown("users")}>
          <FaRegCircle /> User Management
        </li>
        {openDropdowns.users && (
          <ul className="submenu">
            <li><NavLink to="/admin/users/customers" className={({ isActive }) => (isActive ? "active" : "")}>Customers</NavLink></li>
            <li><NavLink to="/admin/users/service-providers" className={({ isActive }) => (isActive ? "active" : "")}>Service Providers</NavLink></li>
            <li><NavLink to="/admin/users/vendors" className={({ isActive }) => (isActive ? "active" : "")}>Vendors</NavLink></li>
            <li><NavLink to="/admin/users/referrals" className={({ isActive }) => (isActive ? "active" : "")}>Referrals</NavLink></li>
            <li><NavLink to="/admin/users/support" className={({ isActive }) => (isActive ? "active" : "")}>Support</NavLink></li>
          </ul>
        )}

        <li className="dropdown" onClick={() => toggleDropdown("design")}>
          <FaRegCircle /> Design Management
        </li>
        {openDropdowns.design && (
          <ul className="submenu">
            <li><NavLink to="/admin/designs/all" className={({ isActive }) => (isActive ? "active" : "")}>All Designs</NavLink></li>
            <li><NavLink to="/admin/designs/create" className={({ isActive }) => (isActive ? "active" : "")}>Create Designs</NavLink></li>
          </ul>
        )}

        <hr />
        <li><NavLink to="/admin/administration" className={({ isActive }) => (isActive ? "active" : "")}><FaRegCircle /> Administration</NavLink></li>
        <li><NavLink to="/admin/settings" className={({ isActive }) => (isActive ? "active" : "")}><FaRegCircle /> Settings</NavLink></li>
        <hr />
        <li className="dropdown" onClick={() => toggleDropdown("support")}>
          <FaRegCircle /> Help & Support
        </li>
        {openDropdowns.support && (
          <ul className="submenu">
            <li><NavLink to="/admin/support/faqs" className={({ isActive }) => (isActive ? "active" : "")}>FAQs</NavLink></li>
            <li><NavLink to="/admin/support/legal" className={({ isActive }) => (isActive ? "active" : "")}>Legal</NavLink></li>
            <li><NavLink to="/admin/support/about" className={({ isActive }) => (isActive ? "active" : "")}>About</NavLink></li>
          </ul>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
