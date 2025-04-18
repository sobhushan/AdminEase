import { useState } from "react";
import axios from "axios";
import "./CreateDesign.css";

interface Design {
  design_id: number;
  name: string;
  description: string;
  category: string;
  image: string;
  votes: number;
}

const CreateDesign = ({ onAddDesign }: { onAddDesign: (design: Design) => void }) => {
  const [name, setName] = useState("");
  const [description, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<Design | null>(null);
  const [saving, setSaving] = useState(false);

  const handlePreview = () => {
    if (name || description || category || image) {
      setPreview({
        design_id: Date.now(),
        name,
        description,
        category,
        image,
        votes: Math.floor(Math.random() * 50),
      });
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || !category || !image) {
      setError("All fields are required.");
      return;
    }

    const newDesign = {
        name,
        description,
        category,
        image,
        votes: Math.floor(Math.random() * 50), // Random initial votes
    };
    setSaving(true);
    try {
        const response = await axios.post("http://localhost:3000/api/designs", newDesign, {
            headers: { "Content-Type": "application/json" },
    });

    alert("New Design Saved!");
    console.log("Design Saved:", response.data);
    
    setPreview(response.data); // Load preview before saving
    onAddDesign(response.data);
    } catch (error) {
       console.error("Error saving design:", error);
       setError("Failed to save design.");
    }finally{
       setSaving(false);
    }

    setName("");
    setDesc("");
    setCategory("");
    setImage("");
    setError("");
  };

  return (
    <main className="main-content">
      <div className="card">
        <div className="card-body">
          <div className="card-title d-flex justify-content-between align-items-center">
            <div>
              <h4 className="mb-0">Create Design</h4>
              <h6 className="text-muted mb-4">Save to see the preview</h6>
            </div>
         </div>

          <div className="d-flex gap-4">
             {/* Left Side: Form */}
             <div className="design-form-container">
              <form onSubmit={handleSubmit} className="design-form">
                {error && <p className="error-text">{error}</p>}
                <div className="form-group">
                  <label>Design Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        handlePreview();
                    }}
                    placeholder="Enter design name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    value={description}
                    onChange={(e) => {
                        setDesc(e.target.value);
                        handlePreview();
                    }}
                    placeholder="Enter design description"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    className="form-control"
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value);
                        handlePreview();
                      }}
                    placeholder="Enter category (e.g., Modern, Minimalist)"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="url"
                    className="form-control"
                    value={image}
                    onChange={(e) => {
                        setImage(e.target.value);
                        setPreview((prev) => prev ? { ...prev, image: e.target.value } : null);
                      }}
                    placeholder="Enter image URL"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary mt-3" disabled={saving}>
                  {saving ? "Saving..." : "Save Design"}
                </button>
              </form>
            </div>

            {/* Right Side: Preview Card */}
            <div className="preview-card-container">
              {preview ? (
                <div className="design-card">
                  <img src={preview.image} alt={preview.name} className="design-image" />
                  <div className="design-info">
                      <h5>{preview.name}</h5>
                      <p>{preview.description}</p>
                    </div>

                    <div className="votes-count">⭐ {preview.votes} Votes</div>
                </div>
              ) : (
                <p className="preview-placeholder">Preview will appear here after saving.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateDesign;
