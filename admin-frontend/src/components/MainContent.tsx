import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Customers from "../components/users/Customers"; 
import CreateDesign from "../components/designs/CreateDesign";
import Designs from "../pages/Designs"; 
import VoteDetails from "../pages/VoteDetails";

export interface Design {
  design_id: number;
  name: string;
  description: string;
  category: string;
  image: string;
}


const MainContent = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  const [designs, setDesigns] = useState<Design[]>([]);
  const handleAddDesign = (newDesign: Design) => {
    setDesigns((prevDesigns) => [...prevDesigns, newDesign]);
    console.log("Updated Designs:", designs); // Debugging
  };
  return (
    <div className={`main-content ${isSidebarOpen ? "shifted" : ""}`}>
      <Routes>
        <Route path="/admin" element={<Customers />} />
        <Route path="/admin/users/customers" element={<Customers />} />
        <Route path="/admin/designs/create" element={<CreateDesign onAddDesign={handleAddDesign} />} />
        <Route path="/admin/designs/all" element={<Designs />} />
        <Route path="/admin/designs/:id/votes" element={<VoteDetails />} />
        {/* <Route path="/designs/*" element={<Designs />} />  */}
      </Routes>
    </div>
  );
};

export default MainContent;
