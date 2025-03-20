import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Customers from "../components/users/Customers"; 
import CreateDesign from "../components/designs/CreateDesign";
import Designs from "../pages/Designs"; 
export interface Design {
  id: number;
  name: string;
  desc: string;
  category: string;
  image: string;
  votes: number;
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
        <Route path="/dashboard" element={<Customers />} />
        <Route path="/users/customers" element={<Customers />} />
        <Route path="/designs/create" element={<CreateDesign onAddDesign={handleAddDesign} />} />
        <Route path="/designs/all" element={<Designs />} />
        {/* <Route path="/designs/*" element={<Designs />} />  */}
      </Routes>
    </div>
  );
};

export default MainContent;
