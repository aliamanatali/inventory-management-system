import React, { useState } from "react";
import { useParams } from "react-router-dom";
import UserRequests from "./UserRequests";

const UserDashboard = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [tickets, setTickets] = useState([]);

  const userArray = [
    {
      name: "Alice Johnson",
      role: "Admin",
      email: "alice@example.com",
      id: "1",
      department: "IT",
    },
    {
      name: "Bob Smith",
      role: "IT Person",
      email: "bob@example.com",
      id: "2",
      department: "IT",
    },
    {
      name: "Carol White",
      role: "Employee",
      email: "carol@example.com",
      id: "3",
      department: "HR",
    },
    {
      name: "Dave Brown",
      role: "Admin",
      email: "dave@example.com",
      id: "4",
      department: "Finance",
    },
    {
      name: "Eve Davis",
      role: "IT Person",
      email: "eve@example.com",
      id: "5",
      department: "IT",
    },
    {
      name: "Frank Miller",
      role: "Employee",
      email: "frank@example.com",
      id: "6",
      department: "Marketing",
    },
  ];

  const user = userArray.find((user) => user.id === id);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handleAddTicket = (ticket) => {
    setTickets([...tickets, ticket]);
    setShowModal(false);
  };

  return (
    <div className="container-fluid m-5 justify-around">
      <div className="flex justify-between">
        <h1 className="text-5xl">User Dashboard </h1>
        <div>
          <p>
            Welcome back, <b>{user.name}</b>
          </p>
          <p className="">User ID: {id} </p>
        </div>
      </div>
      <hr />
      <div className="flex flex-row-reverse">
        <button
          onClick={handleModalToggle}
          className=" bg-green-600 text-white mt-2 rounded px-4 py-2"
        >
          Ticket +
        </button>
      </div>
      {showModal && (
        <UserRequests
          onClose={handleModalToggle}
          onAddTicket={handleAddTicket}
          userArray={userArray}
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
              <strong>Employee ID:</strong> {ticket.employeeId}
            </p>
            <p>
              <strong>Employee Name:</strong> {ticket.employeeName}
            </p>
            <p>
              <strong>Reason:</strong> {ticket.reason}
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
