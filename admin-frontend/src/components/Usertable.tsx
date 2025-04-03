import { useState, useEffect } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { TbFlag3 } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdDoNotDisturb } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "../styles/Table.css";

interface User {
    user_id: number;
    username: string;
    phone: string;
    gender: string;
    address: string;
    status:string;
    created_at: string;
  }

const Usertable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedRows, setSelectedRows] = useState<Record<number, boolean>>({});
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/api/users")
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  const toggleRowSelection = (id:number) => {
    setSelectedRows(prev => {
      const newSelectedRows = { ...prev, [id]: !prev[id] };
      setSelectAll(users.every(user => newSelectedRows[user.user_id]));
      return newSelectedRows;
    });
  };

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? {} : users.reduce((acc, user) => ({ ...acc, [user.user_id]: true }), {}));
  };

  const showAlert = () => alert("Action coming soon");

  return (
    <div className="responsive-table">
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th><input type="checkbox" checked={selectAll} onChange={toggleSelectAll} /></th>
              <th>ID</th>
              <th>Picture</th>
              <th>Full Name</th>
              <th>Mobile Number</th>
              <th>Gender</th>
              <th>City</th>
              <th>Date of Registration</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.user_id} className={selectedRows[user.user_id] ? "selected" : ""}>
                <td><input type="checkbox" checked={!!selectedRows[user.user_id]} onChange={() => toggleRowSelection(user.user_id)} /></td>
                <td>{user.user_id}</td>
                <td><img src={"/images/pfp.png"} alt="profile" className="profile-img" /></td>
                <td>{user.username}</td>
                <td>{user.phone}</td>
                <td>{user.gender}</td>
                <td>{user.address}</td>
                <td>{user.created_at}</td>
                <td><span className={`status-badge ${user.status.toLowerCase()}`}>{user.status}</span></td>
                <td>
                  <div className="action-buttons">
                    <button className="btn btn-light" onClick={showAlert}><IoEyeOutline /></button>
                    <button className="btn btn-light" onClick={showAlert}><LuPencilLine /></button>
                    <button className="btn btn-light" onClick={showAlert}><TbFlag3 /></button>
                    <button className="btn btn-light" onClick={showAlert}><MdDoNotDisturb /></button>
                    <button className="btn btn-light" onClick={showAlert}><FaRegTrashAlt /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Usertable;
