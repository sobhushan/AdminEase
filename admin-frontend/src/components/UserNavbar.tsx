import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdPerson } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { BsEmojiSmileUpsideDown } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import "../styles/UserNavbar.css"; 

interface UserNavbarProps {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserNavbar: React.FC<UserNavbarProps> = ({ setSidebarOpen }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    // Clear the localStorage and redirect to login page
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <div className="user-navbar">
      <div className="navbar-left">
        <button className="hamburger-menu" onClick={() => setSidebarOpen(true)}>
          <GiHamburgerMenu size={24} />
        </button>
        <h1 className="company-name"><BsEmojiSmileUpsideDown /> MyMerch</h1>
      </div>

      <div className="navbar-right">
        <div className="username-dropdown" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <IoMdPerson size={24} />
          <span className="username">{username}</span>
        </div>

        {dropdownOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-item" onClick={() => window.location.href ="/profile"}>Profile</div>
            <div className="dropdown-item" onClick={() => window.location.href ="/orders"}>Orders</div>
            <div className="dropdown-item" onClick={() => window.location.href ="/saved"}>Saved</div>
            <div className="dropdown-item" onClick={handleLogout}><CiLogout /></div>
          </div>
        )}

        <button className="cart-icon-bag" onClick={() => window.location.href ="/bag"}>
          <FaShoppingCart size={24} />
        </button>
      </div>
    </div>
  );
};

export default UserNavbar;
