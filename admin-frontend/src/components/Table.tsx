import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { TbFlag3 } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdDoNotDisturb } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Table.css";

const Table = () => {
  const [selectedRows, setSelectedRows] = useState<{ [key: number]: boolean }>({});
  const [selectAll, setSelectAll] = useState(false);

  type User = {
    id: string;
    name: string;
    mobile: string;
    gender: string;
    city: string;
    dateOfRegistration: string;
    status: string;
  };

  const users: User[] = [
    { id: "34275789", name: "Sheena", mobile: "+966 4567345", gender: "Female", city: "Vegas", dateOfRegistration: "29/02/2024", status: "Active" },
    { id: "34275790", name: "Sheena Bajaj", mobile: "+966 4567345", gender: "Female", city: "Vegas", dateOfRegistration: "29/02/2024", status: "Active" },
    { id: "34275791", name: "Sheena", mobile: "Text", gender: "Male", city: "Text", dateOfRegistration: "Text", status: "Inactive" },
    { id: "34275792", name: "Sheena", mobile: "Text", gender: "Male", city: "Text", dateOfRegistration: "Text", status: "Active" },
    { id: "34275793", name: "Sheena", mobile: "Text", gender: "Male", city: "Text", dateOfRegistration: "Text", status: "Active" },
    // { id: "34275794", name: "Sheena", mobile: "Text", gender: "Female", city: "Text", dateOfRegistration: "Text", status: "Active" },
    // { id: "34275793", name: "Sheena", mobile: "Text", gender: "Male", city: "Text", dateOfRegistration: "Text", status: "Inactive" }
  ];

  const toggleRowSelection = (id: number) => {
    setSelectedRows((prev) => {
      const newSelectedRows = { ...prev, [id]: !prev[id] };
      const allRowsSelected = users.every((user) => newSelectedRows[Number(user.id)]);

      setSelectAll(allRowsSelected);
      return newSelectedRows;
    });
  };

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    const newSelectedRows = newSelectAll
      ? users.reduce((acc, user) => ({ ...acc, [Number(user.id)]: true }), {})
      : {};

    setSelectedRows(newSelectedRows);
  };

  const showAlert = () => alert("Action coming soon");

  return (
    <div className="responsive-table">
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
              />
            </th>
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
          {users.map((user) => (
            <tr key={user.id} className={selectedRows[Number(user.id)] ? "selected" : ""}>
              <td>
                <input
                  type="checkbox"
                  checked={!!selectedRows[Number(user.id)]}
                  onChange={() => toggleRowSelection(Number(user.id))}
                />
              </td>
              <td>{user.id}</td>
              <td>
                {/* <img src="https://picsum.photos/id/669/40" alt="profile" className="profile-img" /> */}
                <img src="/images/pfp.png" alt="profile" className="profile-img" />
              </td>
              <td>{user.name}</td>
              <td>{user.mobile}</td>
              <td>{user.gender}</td>
              <td>{user.city}</td>
              <td>{user.dateOfRegistration}</td>
              <td>
                <span className={`status-badge ${user.status.toLowerCase()}`}>{user.status}</span>
              </td>
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

export default Table;