import React, { useState, useEffect } from "react";
import UserRequests from "./UserRequests";
import axios from "axios"; // Import axios for API calls

const UserDashboard = () => {
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    console.log("This user is a", storedUser.role);
    setUser(storedUser);
  }, []);

  useEffect(() => {
    if (user) {
      const fetchTickets = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/tickets/${user.id}`);
          console.log(response.data);
          setTickets(response.data);
        } catch (error) {
          console.error("Error fetching tickets:", error);
        }
      };

      fetchTickets();
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handleAddTicket = async (ticket) => {
    try {
      const response = await axios.post("http://localhost:3001/api/tickets", ticket);
      setTickets([...tickets, response.data]);
      setShowModal(false);
    } catch (error) {
      console.error("Error adding ticket:", error);
    }
  };

  return (
    <div className="container-fluid m-5 justify-around">
      <div className="flex justify-between">
        <h1 className="text-5xl">User Dashboard</h1>
        <div>
          <p>
            Welcome back, <b>{user.name}</b>
          </p>
          <p className="">User ID: {user.id}</p>
        </div>
      </div>
      <hr />
      <div className="flex flex-row-reverse">
        <button
          onClick={handleModalToggle}
          className="bg-green-600 text-white mt-2 rounded px-4 py-2"
        >
          Ticket +
        </button>
      </div>
      {showModal && (
        <UserRequests
          onClose={handleModalToggle}
          onAddTicket={handleAddTicket}
        />
      )}
      <div>
        {tickets.map((ticket, index) => (
          <div
            key={index}
            className="border p-4 rounded my-2 bg-white shadow-md"
          >
            <h3 className="text-lg font-bold">Ticket {index + 1}</h3>
            <p>
              <strong>Product:</strong> {ticket.category}
            </p>
            {ticket.subInventory && (
              <div>
                <strong>Sub-Inventory Items:</strong>
                <ul>
                  {ticket.subInventory.laptopBag && <li>Laptop Bag</li>}
                  {ticket.subInventory.mouse && <li>Mouse</li>}
                  {ticket.subInventory.charger && <li>Charger</li>}
                </ul>
              </div>
            )}
            <p>
              <strong>Employee Name:</strong> {ticket.employeeName}
            </p>
            <p>
              <strong>Reason:</strong> {ticket.description}
            </p>
            <p>
              <strong>Status:</strong> {ticket.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
