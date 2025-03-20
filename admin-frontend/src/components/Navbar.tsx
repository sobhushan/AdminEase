import { CiSearch } from "react-icons/ci";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaBell,FaRegCircle } from "react-icons/fa";
import { TbMessage } from "react-icons/tb";
import { GoPeople } from "react-icons/go";
import { GiHamburgerMenu } from "react-icons/gi";
import "../styles/Navbar.css"
import { useState } from "react";

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const handleClick = () => alert("Function coming soon");

  return (
    <nav className="navbar-container">
        <button className="hamburger-btn" onClick={toggleSidebar}>
          <GiHamburgerMenu />
        </button>
      <div className="navbar-content">
        <button  className="btn btn-light rounded-circle p-2 navb" onClick={handleClick}>
        <IoDocumentTextOutline />
        </button>
        <button  className="btn btn-light rounded-circle p-2 navb" onClick={handleClick}>
        <GoPeople />
        </button>
        <button  className="btn btn-light rounded-circle p-2 navb" onClick={handleClick}>
        <FaRegCircle />
        </button>

        {/* Search bar */}
        <form className="search-container">
          <CiSearch className="search-icon" />
          <input className="search-input" type="search" placeholder="Search" />
        </form>

        <button className="btn btn-light rounded-circle p-2 navb" onClick={handleClick}>
        <TbMessage />
        </button>
        <button className="btn btn-light rounded-circle p-2 navb" onClick={handleClick}>
        <FaBell />
        </button>
        </div>
        {/* User Dropdown */}
        <div className="user-dropdown">
          <button
            className="btn btn-outline-secondary userbtn"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            👤Username
          </button>
          {dropdownOpen && (
            <ul className="dropdown-menu show">
              <li>
                <a className="dropdown-item" href="#">
                  Profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Settings
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Logout
                </a>
              </li>
            </ul>
          )}
        </div>
      
    </nav>
  );
};

export default Navbar;
