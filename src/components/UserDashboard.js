import React, { useState, useEffect } from "react";
import UserRequests from "./UserRequests";
import axios from "axios";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [assignedProducts, setAssignedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      fetchAssignedProducts(storedUser.id); 
    }
  }, []);

  useEffect(() => {
    if (user.id) {
      const fetchTickets = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/tickets/${user.id}`);
          setTickets(response.data);
        } catch (error) {
          console.error("Error fetching tickets:", error);
        }
      };

      fetchTickets();
    }
  }, [user]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/products");
        const productsMap = response.data.reduce((acc, product) => {
          acc[product.id] = product.name;
          return acc;
        }, {});
        setAllProducts(productsMap);
      } catch (error) {
        console.error("Error fetching all products:", error);
      }
    };

    fetchAllProducts();
  }, []);

  const fetchAssignedProducts = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/assign/${userId}`);
      setAssignedProducts(response.data);
    } catch (error) {
      console.error("Error fetching assigned products:", error);
    }
  };

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handleAddTicket = (ticket) => {
    setTickets([...tickets, ticket]);
    setShowModal(false);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid m-5">
      <div className="flex justify-between mb-4">
        <h1 className="text-5xl">User Dashboard</h1>
        <div>
          <p>
            Welcome back, <b>{user.name}</b>
          </p>
          <p className="">User ID: {user.id}</p>
        </div>
      </div>
      <hr />
      <div className="flex flex-row-reverse mb-4">
        <Link to="/signin">
          <button className="bg-green-600 mt-2 mr-1 text-white py-2 px-4 rounded border">
            Logout
          </button>
        </Link>

        <button
          onClick={handleModalToggle}
          className="bg-green-600 text-white mt-2 mr-1 rounded px-4 py-2"
        >
          Ticket +
        </button>
      </div>
      {showModal && (
        <UserRequests onClose={handleModalToggle} onAddTicket={handleAddTicket} />
      )}

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Assigned Products</h3>
        {assignedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {assignedProducts.map((product) => (
              <div key={product.productId} className="border p-4 rounded shadow-md bg-white">
                <p className="font-medium">Product Name:</p>
                <p>{allProducts[product.productId] || "Unknown"}</p>
                <p className="font-medium mt-2">Assigned Date:</p>
                <p>{new Date(product.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No products assigned to this user.</p>
        )}
      </div>

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
