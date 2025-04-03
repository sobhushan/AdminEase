import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ImBlocked } from "react-icons/im";
import { GoTrash } from "react-icons/go";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Table.css";

interface User {
  user_id: number;
  username: string;
  phone: string;
  gender: string;
  address: string;
  role: string;
  created_at: string;
}

interface Design {
  design_id: number;
  name: string;
  description: string;
  image: string;
}


const VoteDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [users, setUsers] = useState<User[]>([]);
  const [design, setDesign] = useState<Design | null>(null);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Record<number, boolean>>({});

  useEffect(() => {
    axios.get(`http://localhost:3000/api/desvote?design_id=${id}`)
      .then(response => setUsers(response.data.votes))
      .catch(error => console.error("Error fetching votes:", error));
  }, [id]);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/designs?design_id=${id}`)
  .then(response => setDesign(response.data))
  .catch(error => console.error("Error fetching design:", error));
  }, [id]);


  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    const newSelectedRows = users.reduce((acc, user) => {
      acc[user.user_id] = newSelectAll;
      return acc;
    }, {} as Record<number, boolean>);
    setSelectedRows(newSelectedRows);
  };

  const toggleRowSelection = (userId: number) => {
    setSelectedRows(prev => ({ ...prev, [userId]: !prev[userId] }));
  };

  const handleBlock = (userId: number) => {
    axios.put(`http://localhost:3000/api/desvote/${userId}`)
      .then(() => alert("User blocked successfully!"))
      .catch(error => console.error("Error blocking user:", error));
  };

  const handleDelete = (userId: number) => {
    axios.delete(`http://localhost:3000/api/desvote/${userId}`)
      .then(() => {
        alert("User deleted successfully!");
        setUsers(users.filter(user => user.user_id !== userId));
      })
      .catch(error => console.error("Error deleting user:", error));
  };

  return (
    <main className="main-content">
      <div className="card flex-grow-1">
        <div className="card-body">
          <div className="card-title d-flex justify-content-between align-items-center">
            <h4 className="mb-0">Vote Details</h4>
            <form className="search-container">
              <input className="search-input" type="search" placeholder="Search" />
            </form>
          </div>
          <div className="d-flex">
          {design && (
            <div className="design-card mt-5">
              <img src={design.image} alt={design.name} className="design-image" />
              <div className="design-info">
                <h5>{design.name}</h5>
                <p>{design.description}</p>
              </div>
            </div>
          )}
          <div className="responsive-table mt-4">
            <div className="table-container">
              <table className="custom-table">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" checked={selectAll} onChange={toggleSelectAll} />
                  </th>
                  <th>ID</th>
                  <th>Picture</th>
                  <th>Username</th>
                  <th>Phone</th>
                  <th>Gender</th>
                  <th>Address</th>
                  <th>Created On</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.user_id} className={selectedRows[user.user_id] ? "selected" : ""}>
                    <td>
                      <input type="checkbox" checked={!!selectedRows[user.user_id]} onChange={() => toggleRowSelection(user.user_id)} />
                    </td>
                    <td>{user.user_id}</td>
                    <td>
                      <img src="/images/pfp.png" alt="profile" className="profile-img" />
                    </td>
                    <td>{user.username}</td>
                    <td>{user.phone}</td>
                    <td>{user.gender}</td>
                    <td>{user.address}</td>
                    <td>{new Date(user.created_at).toLocaleDateString()}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn btn-light" onClick={() => handleBlock(user.user_id)}><ImBlocked /></button>
                        <button className="btn btn-light" onClick={() => handleDelete(user.user_id)}><GoTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

              </table>
            </div>
          </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default VoteDetails;
