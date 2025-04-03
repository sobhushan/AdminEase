import { useEffect, useState } from "react";
import axios from "axios";
import { LuPencilLine } from "react-icons/lu";
import { GoTrash } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/Design.css";

interface Design {
  design_id: number;
  name: string;
  description: string;
  category: string;
  image: string;
}

const Designs = () => {

  const [designs, setDesigns] = useState<Design[]>([]);
  const [votes, setVotes ] = useState<{ [key: number]: number }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [hiddenDesigns, setHiddenDesigns] = useState<{ [key: number]: boolean }>({}); 
  const [loading, setLoading] = useState(false);
  // State for editing modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/api/designs") // Update with your API URL
      .then((response) => {
        setDesigns(response.data); // Ensure API returns an array of designs
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching designs:", error);
        setLoading(false);
      });

      // Fetch votes count
      axios.get("http://localhost:3000/api/votecount")
      .then((response) => {
        const votesData: { [key: number]: number } = {};
        response.data.votes.forEach((vote: { design_id: number; total_votes: number }) => {
          votesData[vote.design_id] = vote.total_votes;
        });
        setVotes(votesData);
      })
      .catch((error) => console.error("Error fetching votes:", error));
  }, []);

  const handleVoteClick = (designId: number) => {
    navigate(`/admin/designs/${designId}/votes`);
  };


 // Function to open modal with selected design data
  const handleEdit = (design: Design) => {
    setSelectedDesign(design);
    setShowEditModal(true);
  };

  // Function to handle input changes in the modal
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (selectedDesign) {
      setSelectedDesign({ ...selectedDesign, [e.target.name]: e.target.value });
    }
  };

// Function to submit the updated design data
  const handleSaveChanges = async () => {
    if (!selectedDesign) return;

    try {
      await axios.put(`http://localhost:3000/api/designs`, selectedDesign); // Update API endpoint accordingly
      alert("Design updated successfully!");
      setShowEditModal(false);
      window.location.reload(); // Reload to fetch updated data
    } catch (error) {
      console.error("Error updating design:", error);
    }
  };

  // Function to close modal
  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedDesign(null);
  };

  // To Handle Delete
  const handleDelete = async (design_id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this design?");
    if (!confirmDelete) return;
  
    if (!design_id) {
      console.error("Design ID is missing!");
      return;
    }
  
    console.log("Sending delete request for design:", design_id);
  
    try {
      const response = await axios.delete("http://localhost:3000/api/designs", {
        data: { design_id }, // Send ID in request body
        headers: { "Content-Type": "application/json" },
      });
  
      console.log("Delete response:", response.data);
      alert("Design deleted successfully");
      window.location.reload(); // Refresh page after deletion
    } catch (error) {
      console.error("Error deleting design:", error);
    }
  };
  

  const handleHide = (id: number) => {
    setHiddenDesigns((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle hidden state
    }));
  };

  const handleAdd = () => {
    window.location.href="/admin/designs/create";
  }

   // **Filtering Designs Based on Search Query**
   const filteredDesigns = designs.filter((design) =>
    design.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    design.description.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  return (
    <>
      <main className="main-content">
        {/* Header Section */}
        <div className="card">
          <div className="card-body">
            <div className="card-title d-flex justify-content-between align-items-center">
              <div>
                <h4 className="mb-0">Designs</h4>
                <h6 className="text-muted">All Designs</h6>
              </div>
  
              <div className="d-flex align-items-center gap-2">
                <button className="btn btn-light rounded-circle p-2 cardb" style={{ fontSize: "20px" }}
                onClick={handleAdd}>
                  <IoIosAddCircleOutline />
                </button>
                <form className="search-container">
                  <CiSearch className="search-icon" />
                  <input className="search-input" type="search" placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} />
                </form>
              </div>
            </div>

  
            {/* Designs Grid */}
            {loading ? (
              <p className="text-center mt-3">Loading designs...</p>
            ) : filteredDesigns.length > 0 ? (
              <div className="designs-grid">
                {filteredDesigns.map((design) => (
                  <div
                    className={`design-card ${hiddenDesigns[design.design_id] ? "hidden-card" : ""}`}
                    key={design.design_id}
                  >
                    <img src={design.image} alt={design.name} className="design-image" />

                    <div className="card-buttons">
                      <button className="btn btn-light rounded-circle p-2 cardbtn"  onClick={() => handleHide(design.design_id)}>
                        {hiddenDesigns[design.design_id] ? <ImEyeBlocked /> : <ImEye />}
                      </button>
                      <button className="btn btn-light rounded-circle p-2 cardbtn"   onClick={() => handleEdit(design)}>
                        <LuPencilLine />
                      </button>
                      <button className="btn btn-light rounded-circle p-2 cardbtn"  onClick={() => handleDelete(design.design_id)}>
                        <GoTrash />
                      </button>
                    </div>

                    <div className="design-info">
                      <h5>{design.name}</h5>
                      <p>{design.description}</p>
                    </div>

                    <div className="btn votes-count" onClick={() => handleVoteClick(design.design_id)}>⭐ {votes[design.design_id] ?? 0} Votes</div>
                  </div>
                ))}
                </div>
              ) : (
                <p className="text-center mt-3">No designs found.</p>
              )}
            </div>
        </div>
      </main>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Design</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {selectedDesign && (
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={selectedDesign.name}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="description"
                        value={selectedDesign.description}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        type="text"
                        name="category"
                        value={selectedDesign.category}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Image URL</Form.Label>
                      <Form.Control
                        type="text"
                        name="image"
                        value={selectedDesign.image}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Form>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>

    </>
    );
};

export default Designs;

// // //=======================================================================================================
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { LuPencilLine } from "react-icons/lu";
// import { GoTrash } from "react-icons/go";
// import { CiSearch } from "react-icons/ci";
// import { IoIosAddCircleOutline } from "react-icons/io";
// import { ImEye, ImEyeBlocked } from "react-icons/im";
// import "../styles/Design.css";

// interface Design {
//   id: number;
//   name: string;
//   desc: string;
//   category: string;
//   image: string;
//   votes: number;
// }

// const Designs = () => {
//   const [designs, setDesigns] = useState<Design[]>([]);
//   const [votes, setVotes] = useState<{ [key: number]: number }>({});
//   const [searchQuery, setSearchQuery] = useState("");
//   const [hiddenDesigns, setHiddenDesigns] = useState<{ [key: number]: boolean }>({});
//   const [loading, setLoading] = useState(true);

//   // **Fetch Designs from API**
//   useEffect(() => {
//     axios.get("http://localhost:3000/api/designs") // Update with your API URL
//       .then((response) => {
//         setDesigns(response.data); // Ensure API returns an array of designs
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching designs:", error);
//         setLoading(false);
//       });
//   }, []);

//   // **Vote Animation Logic**
//   useEffect(() => {
//     if (designs.length === 0) return;

//     const duration = 1000;
//     const steps = 30; 
//     const intervalTime = duration / steps;

//     const initialVotes: { [key: number]: number } = {};
//     designs.forEach((design) => (initialVotes[design.id] = 0));
//     setVotes(initialVotes);

//     designs.forEach((design) => {
//       const increment = design.votes / steps; 
//       let currentVote = 0;
//       const interval = setInterval(() => {
//         currentVote += increment;

//         setVotes((prevVotes) => ({
//           ...prevVotes,
//           [design.id]: Math.min(Math.round(currentVote), design.votes),
//         }));

//         if (currentVote >= design.votes) {
//           clearInterval(interval);
//         }
//       }, intervalTime);
//     });
//   }, [designs]); // Only run when `designs` changes

//   // **Handle Actions**
//   const handleEdit = (id: number) => {
//     alert(`Edit card id: ${id}`);
//   };

//   const handleDelete = (id: number) => {
//     axios.delete(`http://localhost:3000/api/designs/${id}`)
//       .then(() => {
//         setDesigns((prevDesigns) => prevDesigns.filter((design) => design.id !== id));
//       })
//       .catch((error) => console.error("Error deleting design:", error));
//   };

//   const handleHide = (id: number) => {
//     setHiddenDesigns((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   const handleAdd = () => {
//     window.location.href = "/designs/create";
//   };

//   // **Filtering Designs Based on Search Query**
//   const filteredDesigns = designs?.filter((design) =>
//     design.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     design.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     design.votes.toString().includes(searchQuery)
//   ) || [];

//   return (
//     <>
//       <main className="main-content">
//         <div className="card">
//           <div className="card-body">
//             <div className="card-title d-flex justify-content-between align-items-center">
//               <div>
//                 <h4 className="mb-0">Designs</h4>
//                 <h6 className="text-muted">All Designs</h6>
//               </div>

//               <div className="d-flex align-items-center gap-2">
//                 <button className="btn btn-light rounded-circle p-2 cardb" style={{ fontSize: "20px" }} onClick={handleAdd}>
//                   <IoIosAddCircleOutline />
//                 </button>
//                 <form className="search-container">
//                   <CiSearch className="search-icon" />
//                   <input className="search-input" type="search" placeholder="Search"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                   />
//                 </form>
//               </div>
//             </div>

//             {/* Show Loading Indicator */}
//             {loading ? <p>Loading designs...</p> : (
//               <div className="designs-grid">
//                 {filteredDesigns.length > 0 ? (
//                   filteredDesigns.map((design) => (
//                     <div
//                       className={`design-card ${hiddenDesigns[design.id] ? "hidden-card" : ""}`}
//                       key={design.id}
//                     >
//                       <img src={design.image} alt={design.name} className="design-image" />

//                       <div className="card-buttons">
//                         <button className="btn btn-light rounded-circle p-2 cardbtn" onClick={() => handleHide(design.id)}>
//                           {hiddenDesigns[design.id] ? <ImEyeBlocked /> : <ImEye />}
//                         </button>
//                         <button className="btn btn-light rounded-circle p-2 cardbtn" onClick={() => handleEdit(design.id)}>
//                           <LuPencilLine />
//                         </button>
//                         <button className="btn btn-light rounded-circle p-2 cardbtn" onClick={() => handleDelete(design.id)}>
//                           <GoTrash />
//                         </button>
//                       </div>

//                       <div className="design-info">
//                         <h5>{design.name}</h5>
//                         <p>{design.desc}</p>
//                       </div>

//                       <div className="votes-count">⭐ {votes[design.id] ?? 0} Votes</div>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-center mt-3">No designs found.</p>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//     </>
//   );
// };

// export default Designs;
