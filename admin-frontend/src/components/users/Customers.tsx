import { IoEyeOutline } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { TbFlag3 } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdDoNotDisturb } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { useState, useEffect } from "react";
import "./Customers.css";

const UsersCustomers = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [bookingUsers, setBookingUsers] = useState(0);
  const [newSignups, setNewSignups] = useState(0);

  useEffect(() => {
    const animateValue = (setter: any, endValue: number, duration: number) => {
      let start = 0;
      let step = endValue / (duration / 10);

      let counter = setInterval(() => {
        start += step;
        if (start >= endValue) {
          start = endValue;
          clearInterval(counter);
        }
        setter(Math.floor(start));
      }, 10);
    };

    animateValue(setTotalUsers, 677, 800);
    animateValue(setActiveUsers, 242, 800);
    animateValue(setBookingUsers, 242, 800);
    animateValue(setNewSignups, 234, 800);
  }, []);

  return (
    <main className="main-content">
      <div className="card">
        <div className="card-body">
          <div className="card-title d-flex justify-content-between align-items-center">
            <div>
              <h4 className="mb-0">Users</h4>
              <h6 className="text-muted">Customers</h6>
            </div>
            <div className="d-flex align-items-center gap-2">
              <button className="btn btn-light rounded-circle p-2 cardb" style={{ fontSize: "20px" }}>
                <IoEyeOutline />
              </button>
              <button className="btn btn-light rounded-circle p-2 cardb">
                <LuPencilLine />
              </button>
              <button className="btn btn-light rounded-circle p-2 cardb">
                <TbFlag3 />
              </button>
              <button className="btn btn-light rounded-circle p-2 cardb">
                <MdDoNotDisturb />
              </button>
              <button className="btn btn-light rounded-circle p-2 cardb">
                <FaRegTrashAlt />
              </button>
              <form className="search-container">
                <CiSearch className="search-icon" />
                <input className="search-input" type="search" placeholder="Search" />
              </form>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-3">
              <div className="info-card">
                <p className="cardt">Total Users</p>
                <p className="counter">{totalUsers}</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="info-card">
                <p className="cardt">Active Users</p>
                <p className="counter">{activeUsers}</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="info-card">
                <p className="cardt">Users in Booking</p>
                <p className="counter">{bookingUsers}</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="info-card">
                <p className="cardt">New Registrations (This Month)</p>
                <p className="counter">{newSignups}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UsersCustomers;
