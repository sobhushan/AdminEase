import { useEffect, useState } from "react";
import { LuPencilLine } from "react-icons/lu";
import { GoTrash } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import "../styles/Design.css";

interface Design {
  id: number;
  name: string;
  desc: string;
  category: string;
  image: string;
  votes: number;
}

const Designs = () => {
  const [designs,] = useState<Design[]>([
    { id: 1, name: "Modern Interior", desc: "A sleek and stylish interior design.",category:"null", image: "https://picsum.photos/300/200?random=1", votes:25 },
    { id: 2, name: "Cozy Living Room", desc: "Warm and inviting space with neutral tones.",category:"null", image: "https://picsum.photos/300/200?random=2", votes:30 },
    { id: 3, name: "Minimalist Office", desc: "Simple yet elegant workspace design.",category:"null", image: "https://picsum.photos/300/200?random=3", votes:125 },
    { id: 4, name: "Vintage Kitchen", desc: "Retro-inspired kitchen setup.",category:"null", image: "https://picsum.photos/300/200?random=4", votes:95 },
    { id: 5, name: "Futuristic Bedroom", desc: "A high-tech and futuristic bedroom look.",category:"null", image: "https://picsum.photos/300/200?random=5", votes:89 },
    { id: 6, name: "Nature Retreat", desc: "Blending nature with modern comfort.",category:"null", image: "https://picsum.photos/300/200?random=6", votes:25 },
    { id: 7, name: "Urban Loft", desc: "Trendy loft-style apartment design.",category:"null", image: "https://picsum.photos/300/200?random=7", votes:54 },
    { id: 8, name: "Beach House", desc: "Relaxing oceanfront decor.",category:"null", image: "https://picsum.photos/300/200?random=8", votes:12 },
    { id: 9, name: "Artistic Studio", desc: "Creative and inspiring workspace.",category:"null", image: "https://picsum.photos/300/200?random=9", votes:203 },
    { id: 10, name: "Scandinavian Bedroom", desc: "Clean and functional bedroom design.",category:"null", image: "https://picsum.photos/300/200?random=10", votes:43 },
    { id: 11, name: "Industrial Workspace", desc: "Raw materials meet modern efficiency.",category:"null", image: "https://picsum.photos/300/200?random=11", votes:167 },
    { id: 12, name: "Luxury Penthouse", desc: "Elegant and spacious high-rise apartment.",category:"null", image: "https://picsum.photos/300/200?random=12", votes:25 },
  ]);
  
  const [votes, setVotes] = useState<{ [key: number]: number }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [hiddenDesigns, setHiddenDesigns] = useState<{ [key: number]: boolean }>({}); 


  useEffect(() => {
    const duration = 1000;
    const steps = 30; 
    const intervalTime = duration / steps;

    const initialVotes: { [key: number]: number } = {};
    designs.forEach((design) => (initialVotes[design.id] = 0));
    setVotes(initialVotes);

    designs.forEach((design) => {
      const increment = design.votes / steps; // Calculate increment per step

      let currentVote = 0;
      const interval = setInterval(() => {
        currentVote += increment;

        setVotes((prevVotes) => ({
          ...prevVotes,
          [design.id]: Math.min(Math.round(currentVote), design.votes),
        }));

        if (currentVote >= design.votes) {
          clearInterval(interval);
        }
      }, intervalTime);
    });
  }, []);


  const handleEdit = (id: number) => {
    alert(`Edit card id: ${id}`);
  };

  const handleDelete = (id: number) => {
    alert(`Delete card id: ${id}`);
  };

  const handleHide = (id: number) => {
    setHiddenDesigns((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle hidden state
    }));
  };
  const handleAdd = () => {
    window.location.href="/designs/create";
  }

   // **Filtering Designs Based on Search Query**
   const filteredDesigns = designs.filter((design) =>
    design.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    design.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    design.votes.toString().includes(searchQuery)
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
            <div className="designs-grid">
              {filteredDesigns.length > 0 ? (
                filteredDesigns.map((design) => (
                  <div
                    className={`design-card ${hiddenDesigns[design.id] ? "hidden-card" : ""}`}
                    key={design.id}
                  >
                    <img src={design.image} alt={design.name} className="design-image" />

                    <div className="card-buttons">
                      <button className="btn btn-light rounded-circle p-2 cardbtn" onClick={() => handleHide(design.id)}>
                        {hiddenDesigns[design.id] ? <ImEyeBlocked /> : <ImEye />}
                      </button>
                      <button className="btn btn-light rounded-circle p-2 cardbtn" onClick={() => handleEdit(design.id)}>
                        <LuPencilLine />
                      </button>
                      <button className="btn btn-light rounded-circle p-2 cardbtn" onClick={() => handleDelete(design.id)}>
                        <GoTrash />
                      </button>
                    </div>

                    <div className="design-info">
                      <h5>{design.name}</h5>
                      <p>{design.desc}</p>
                    </div>

                    <div className="votes-count">⭐ {votes[design.id] ?? 0} Votes</div>
                  </div>
                ))
              ) : (
                <p className="text-center mt-3">No designs found.</p>
              )}
            </div>
            
          </div>
        </div>
      </main>
    </>
    );
};

export default Designs;
