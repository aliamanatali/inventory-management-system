import React, { useState, useEffect } from "react";
import axios from "axios";
const Users = () => {
  const [userArray, setUserArray] = useState([]);
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

  const [selectedRole, setSelectedRole] = useState("All");

  const roles = [
    ...new Set(userArray.map((user) => user.role)),
    "All"
  ];

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const filteredUsers =
    selectedRole === "All"
      ? userArray
      : userArray.filter((user) => user.role === selectedRole);

  const userCount = filteredUsers.length;

  return (
    <div className="container-fluid mx-auto p-4">
      <div className="flex justify-between mb-4">
        <b className="text-2xl">Users List</b>
      </div>
      <div className="mb-4">
        <label htmlFor="role" className="font-bold mr-2">
          Select Role:
        </label>
        <select
          id="role"
          value={selectedRole}
          onChange={handleRoleChange}
          className="border p-2 rounded"
        >
          {roles.map((role, index) => (
            <option key={index} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <b className="text-xl">Total Users: {userCount}</b>
      </div>
      <div className="grid grid-cols-5 gap-4 font-bold mb-2">
        <div>Name</div>
        <div>Role</div>
        <div>Email</div>
        <div>id</div>
        <div>Department</div>
      </div>
      {filteredUsers.map((user, index) => (
        <div key={index} className="grid grid-cols-5 gap-4 p-4 border mb-2">
          <div>{user.name}</div>
          <div>{user.role}</div>
          <div>{user.email}</div>
          <div>{user.id}</div>
          <div>{user.department}</div>
        </div>
      ))}
    </div>
  );
};

export default Users;
