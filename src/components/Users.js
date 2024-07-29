import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";

const Users = () => {
  const [userArray, setUserArray] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/users");
        setUserArray(response.data);
        console.log("Fetched users:", response.data);
      } catch (err) {
        console.log("Error fetching users:", err.message);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/users/${id}`);
      setUserArray(userArray.filter(user => user.id !== id));
      console.log("User deleted successfully");
    } catch (err) {
      console.log("Error deleting user:", err.message);
    }
  };

  const handleEditUser = (user) => {
    setEditUser(user);
    setShowEditForm(true);
  };

  const handleUpdateUser = async (event) => {
    event.preventDefault();
    const { id, name, email, department, role, password } = editUser;
    try {
      const response = await axios.put(`http://localhost:3001/api/users/${id}`, {
        name,
        email,
        department,
        role,
        password
      });
      setUserArray(userArray.map((user) => user.id === id ? response.data : user));
      setEditUser(null);
      setShowEditForm(false);
      console.log("User updated successfully");
    } catch (err) {
      console.log("Error updating user:", err.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  return (
    <div className="container-fluid mx-auto p-4">
      <div className="flex justify-between mb-4">
        <b className="text-3xl text-yellow-600">User List</b>
        <div>
          <Link to="/user-qty">
            <button className="bg-yellow-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border">
              Qty
            </button>
          </Link>
          <Link to="/create-user">
            <button className="bg-yellow-600 hover:bg-blue-700 text-white font-bold ml-2 py-2 px-4 rounded border">
              Add User
            </button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4 font-bold mb-2 text-yellow-600">
        <div>Name</div>
        <div>Employee Id</div>
        <div>Email</div>
        <div>Department</div>
        <div>Role</div>
        <div>Operations</div>
      </div>
      {userArray.map((item, index) => (
        <div key={index} className="grid grid-cols-6 gap-4 p-4 border mb-2">
          <div>{item.name}</div>
          <div>{item.id}</div>
          <div>{item.email}</div>
          <div>{item.department}</div>
          <div>{item.role}</div>
          <div>
            <button onClick={() => handleEditUser(item)}>
              <FontAwesomeIcon icon={faCheckSquare} />
            </button>
            <button className="ml-2" onClick={() => handleDeleteUser(item.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      ))}
      {showEditForm && editUser && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <form onSubmit={handleUpdateUser}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={editUser.name || ""}
                  onChange={handleInputChange}
                  className="border p-2 mb-2 w-full"
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={editUser.email || ""}
                  onChange={handleInputChange}
                  className="border p-2 mb-2 w-full"
                />
              </label>
              <label>
                Department:
                <input
                  type="text"
                  name="department"
                  value={editUser.department || ""}
                  onChange={handleInputChange}
                  className="border p-2 mb-2 w-full"
                />
              </label>
              <label>
              Role:
          <select
            name="role"
            value={editUser.role || ""}
            onChange={handleInputChange}
            className="border p-2 mb-2 w-full"
            autoComplete="off"
          >
            <option value="Admin">Admin</option>
            <option value="IT Person">IT Person</option>
            <option value="Employee">Employee</option>
          </select>
          </label>
              <label>
                Password:
                <input
                  type="password"
                  name="password"
                  value={editUser.password || ""}
                  onChange={handleInputChange}
                  className="border p-2 mb-2 w-full"
                />
              </label>
              <button
                type="submit"
                className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowEditForm(false)}
                className="ml-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
