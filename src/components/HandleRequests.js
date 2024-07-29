import React, { useState, useEffect } from "react";
import AssignModal from "./AssignModal";
import axios from "axios";

const Requests = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [userArray, setUserArray] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/users");
        setUserArray(response.data);
        console.log("Fetched users in Handle Requests:", response.data);
      } catch (err) {
        console.log("Error fetching users:", err.message);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/tickets");
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  const getUserById = (id) => {
    return userArray.find((user) => user.id === id);
  };

  const handleModalToggle = (ticket = null) => {
    setSelectedTicket(ticket);
    setModalVisible(!modalVisible);
  };

  const handleAccept = async (ticket) => {
    try {
      const response = await axios.post("http://localhost:3001/api/tickets", ticket);
      setTickets([...tickets, response.data]);
      setModalVisible(false);
    } catch (error) {
      console.error("Error adding ticket:", error);
    }
  };

  const handleReject = async (ticketId) => {
    try {
      await axios.delete(`http://localhost:3001/api/tickets/${ticketId}`);
      setTickets(tickets.filter((ticket) => ticket.id !== ticketId));
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  return (
    <div className="container-fluid flex flex-col items-center">
      <h3 className="mb-4 text-3xl">
        <strong>Requests</strong>
      </h3>
      {tickets.filter(ticket => ticket.status === "Pending").length > 0 ? (
        tickets.filter(ticket => ticket.status === "Pending").map((request) => {
          const user = getUserById(request.userId);
          return (
            <div
              key={request.id}
              className="card mb-3 p-5 lg:w-1/3 md:w-2/3 sm:w-1/2 w-2/3 bg-slate-100 text-left"
            >
              <p className="card-text">
                <strong>Requested Item:</strong> {request.category}
              </p>
              <hr />
              <p className="card-title mt-3">
                <strong>Name: </strong>
                {user.name}
                <strong className="ml-2">User id: </strong>
                {user.id} 
                 
                <strong className="ml-2">Role:</strong> {user.role}
              </p>
              <p className="card-text">
                <strong>Reason:</strong> {request.description}
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => handleModalToggle(request)}
                  className="bg-green-500 text-white mt-2 rounded px-3 py-1"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(request.id)}
                  className="bg-red-700 text-white mt-2 ml-2 rounded px-4 py-2"
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p>No requests available.</p>
      )}
      {modalVisible && (
        <AssignModal
          ticketId={selectedTicket.id}
          onClose={() => handleModalToggle(null)}
          onAccept={handleAccept}
        />
      )}
    </div>
  );
};

export default Requests;
