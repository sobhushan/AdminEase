import { useState, useEffect } from "react";
import { BsCartPlus } from "react-icons/bs";
import { BsFillCartCheckFill } from "react-icons/bs";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import axios from "axios";
import {  IoHeartOutline } from "react-icons/io5";
import Usersidebar from "../components/Usersidebar";
import UserNavbar from "../components/UserNavbar";
import "../styles/UserPage.css";

const UserPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [designs, setDesigns] = useState([]);
  const [bookmarkedDesigns, setBookmarkedDesigns] = useState<{ [key: number]: boolean }>({});
  const [votes, setVotes] = useState<{ [key: number]: number }>({});
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    fetchDesigns();
  }, [activeTab]);

  const fetchDesigns = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        console.error("User ID not found in localStorage");
        setLoading(false);
        return;
      }

      // Fetch designs based on activeTab (All or My Designs)
      const endpoint =
        activeTab === "all"
          ? "http://localhost:3000/api/alldesign"
          : `http://localhost:3000/api/userdesign?user_id=${userId}`;

      const response = await axios.get(endpoint);
      const fetchedDesigns = response.data;

      // Fetch vote counts for all designs
      const voteCountsResponse = await axios.get("http://localhost:3000/api/votecount");
      const voteCounts = voteCountsResponse.data.votes;

      // Merge vote counts with the fetched designs
      const designsWithVotes = fetchedDesigns.map((design: any) => {
        const vote = voteCounts.find((vote: any) => vote.design_id === design.design_id);
        return {
          ...design,
          votes: vote ? vote.total_votes : 0,
        };
      });

      setDesigns(designsWithVotes);

      // Initialize bookmarks for each design
      const initialBookmarks: { [key: number]: boolean } = {};
      const initialCart: { [key: number]: boolean } = {};
      fetchedDesigns.forEach((design: any) => {
        initialBookmarks[design.design_id] = design.is_bookmarked || false;
        initialCart[design.design_id] = false; 
      });
      setBookmarkedDesigns(initialBookmarks);
      setCart(initialCart);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching designs:", error);
      setLoading(false);
    }
  };

  const toggleBookmark = (designId: number) => {
    setBookmarkedDesigns((prev) => ({
      ...prev,
      [designId]: !prev[designId],
    }));
  };

  const toggleCart = (designId: number) => {
    alert("⚠️You sure you want to book now?");  
    setCart((prev) => ({
      ...prev,
      [designId]: !prev[designId],
    }));
  };

  const handleVoteClick = (designId: number) => {
    setVotes((prev) => ({
      ...prev,
      [designId]: (prev[designId] ?? 0) + 1,
    }));
  };

  return (
    <>
      <UserNavbar setSidebarOpen={setSidebarOpen} />
      <div>
        {/* Banner Section */}
        <div className="banner-container">
          <img src="/images/image.png" alt="Banner" className="banner-image" />
        </div>

        {sidebarOpen && (
          <Usersidebar onClose={() => setSidebarOpen(false)} onTabChange={setActiveTab} />
        )}

        <div className="main-content-up">
        {loading ? (
            <p className="text-center mt-3">Loading designs...</p>
          ) : designs.length > 0 ? (
            <div className="designs-grid">
              {designs.map((design: any) => (
                <div key={design.design_id} className="design-card">
                  <div className="design-card-image-container">
                    <img src={design.image} alt={design.name} className="design-image" />
                    <div className="cart-icon-container" onClick={() => toggleCart(design.design_id)}>
                      {cart[design.design_id] ? (
                        <BsFillCartCheckFill className="cart-icon" />
                      ) : (
                        <BsCartPlus className="cart-icon" />
                      )}
                    </div>
                  </div>

                  <div className="design-desc">
                    <h5>{design.name}</h5>
                    <p>{design.category}</p>
                    <h6>₹{design.price}</h6>
                  </div>

                  <div className="card-button">
                    <button className="btn votecount" onClick={() => handleVoteClick(design.design_id)}>
                      <IoHeartOutline style={{ fontSize: "20px" }} />{design.votes ?? 0} Votes
                    </button>

                    <button className="btn bookmark-btn" onClick={() => toggleBookmark(design.design_id)}>
                      {bookmarkedDesigns[design.design_id] ? <IoBookmark /> : <IoBookmarkOutline />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center mt-3">No designs found.</p>
          )} 
        </div>
      </div>
    </>
  );
};

export default UserPage;



// // //================================================================================

// import { useState, useEffect } from "react";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { IoMdHeartEmpty } from "react-icons/io";
// import axios from "axios";
// import Usersidebar from "../components/Usersidebar";
// import "../styles/UserPage.css"; 

// const UserPage = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState("all");
//   const [designs, setDesigns] = useState([]);

//   useEffect(() => {
//     fetchDesigns();
//   }, [activeTab]);

//   const fetchDesigns = async () => {
//     try {
//       const userId = localStorage.getItem("user_id");
//       const endpoint =
//         activeTab === "all"
//           ? "http://localhost:3000/api/alldesign"
//           : `http://localhost:3000/api/userdesign?user_id=${userId}`;

//       const response = await axios.get(endpoint);
//       setDesigns(response.data);
//     } catch (error) {
//       console.error("Error fetching designs:", error);
//     }
//   };

//   return (
//     <div className="user-page-container">
//       {/* Sidebar - Conditionally Rendered */}
//       {sidebarOpen && (
//         <Usersidebar 
//           onClose={() => setSidebarOpen(false)} 
//           onTabChange={setActiveTab} 
//         />
//       )}

//       {/* Main Content */}
//       <div className="main-content">
//         <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
//           <GiHamburgerMenu size={24} />
//         </button>

//         <h2 className="page-title"> Welcome to Your Design Dashboard</h2>
//         <p className="viewing-text">Viewing: <strong>{activeTab === "all" ? "All Designs" : "My Designs"}</strong></p>

//         {/* Designs Grid */}
//         <div className="design-grid">
//           {designs.length > 0 ? (
//             designs.map((design: any) => (
//               <div key={design.id} className="design-card">
//                 <img src={design.image} alt={design.name} className="design-img" />
//                 <div className="design-desc">
//                   <h5>{design.name}</h5>
//                   <p>{design.description}</p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="no-designs">
//               <img src="/images/no-designs.svg" alt="No Designs" />
//               <p>No designs found. Start creating now! 🚀</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserPage;


// ====================================================================================

// import { useState, useEffect } from "react";
// import { GiHamburgerMenu } from "react-icons/gi";
// import axios from "axios";
// import Usersidebar from "../components/Usersidebar";
// import "../styles/Login.css"; 

// const UserPage = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState("all");
//   const [designs, setDesigns] = useState([]);

//   useEffect(() => {
//     fetchDesigns();
//   }, [activeTab]);

//   const fetchDesigns = async () => {
//     try {
//       const userId = localStorage.getItem("user_id");
//       const endpoint =
//         activeTab === "all"
//           ? "http://localhost:3000/api/alldesign"
//           : `http://localhost:3000/api/userdesign?user_id=${userId}`;

//       const response = await axios.get(endpoint);
//       setDesigns(response.data);
//     } catch (error) {
//       console.error("Error fetching designs:", error);
//     }
//   };

//   return (
//     <div className="d-flex vh-100">
//       {/* Sidebar */}
//       {sidebarOpen && (
//         <Usersidebar 
//           onClose={() => setSidebarOpen(false)} 
//           onTabChange={setActiveTab} 
//         />
//       )}

//       {/* Main Content */}
//       <div className="flex-grow-1 p-4">
//         <button
//           className="btn btn-dark"
//           onClick={() => setSidebarOpen(!sidebarOpen)}
//           style={{ position: "absolute", top: "20px", left: "20px" }}
//         >
//           <GiHamburgerMenu size={24} />
//         </button>

//         <h2 className="mt-5">Welcome to Your Design Dashboard</h2>
//         <p>Viewing: <strong>{activeTab === "all" ? "All Designs" : "My Designs"}</strong></p>

//         {/* Designs Grid */}
//         <div className="row">
//           {designs.length > 0 ? (
//             designs.map((design: any) => (
//               <div key={design.id} className="col-md-4 mb-4">
//                 <div className="card">
//                   <img src={design.image} alt={design.name} className="card-img-top" />
//                   <div className="card-body">
//                     <h5 className="card-title">{design.name}</h5>
//                     <p className="card-text">{design.description}</p>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No designs found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserPage;

