import React, { useState, useEffect } from "react";
import axios from "axios";

const UserRequests = ({ onClose, onAddTicket }) => {
  const [category, setCategory] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [reason, setReason] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [objArray, setObjArray] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/products");
      setObjArray(response.data);
      console.log("Fetched products:", response.data);
    } catch (err) {
      console.log("Error fetching products:", err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setEmployeeId(storedUser.id);
      setEmployeeName(storedUser.name);
    }
  }, []);

  const categories = [...new Set(objArray.map((item) => item.category))];

  let status = "Pending";

  const handleGenerate = async () => {
    console.log("handleGenerate called");
    if (!category || !employeeId || !employeeName || !reason) {
      setErrorMessage("All fields are compulsory.");
      return;
    }

    const ticket = {
      userId: Number(employeeId),
      category,
      description: reason,
      status,
    };

    console.log("Generated ticket:", ticket);
    try {
      const response = await axios.post("http://localhost:3001/api/tickets", ticket);
      onAddTicket(response.data); // Pass the created ticket to the parent component
      setCategory("");
      setEmployeeId("");
      setEmployeeName("");
      setReason("");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Error creating ticket: " + error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-slate-100 p-4 rounded">
        <h2 className="text-xl font-bold mb-4">Request Product</h2>
        <div className="mb-4">
          <label className="block mb-2">Product Information:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded w-full"
            required
          >
            <option value="">Select Product Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <label className="block mt-4 mb-2">User Information:</label>
          <div className="flex">
            <input
              type="text"
              placeholder="Enter Employee ID"
              className="border p-2 rounded w-full"
              value={employeeId}
              readOnly
              required
            />

            <input
              type="text"
              placeholder="Employee Name"
              value={employeeName}
              readOnly
              required
              className="border p-2 ml-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block mt-4 mb-2">Reason:</label>
            <input
              type="text"
              placeholder="Reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              className="border p-2 rounded w-full"
            />
          </div>
          {errorMessage && (
            <div className="text-red-500 mt-2">{errorMessage}</div>
          )}
        </div>
        <button
          type="button"
          onClick={handleGenerate}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Generate
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UserRequests;
