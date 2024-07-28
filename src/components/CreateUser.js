import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "IT", // Set a default value for department
    role: "Employee",
    password: ""
  });

  const dept = ["IT", "HR", "Finance", "Marketing"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post("http://localhost:3001/api/users", formData);
      console.log("User Created:", response.data);
      alert("User has been created successfully!");
      navigate(`/`);
    } catch (error) {
      console.error("Error creating user:", error.response?.data || error.message);
      alert("Error creating user. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex">
      <button
        onClick={() => navigate(`/`)}
        className="mb-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
      >
        Back
      </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">Create New User</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            autoComplete="off"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            autoComplete="new-email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Department
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            autoComplete="off"
          >
            {dept.map((department, index) => (
              <option key={index} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            autoComplete="off"
          >
            <option value="Admin">Admin</option>
            <option value="IT Person">IT Person</option>
            <option value="Employee">Employee</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            autoComplete="new-password"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
