import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
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
            <button>
              <FontAwesomeIcon icon={faCheckSquare} />
            </button>
            <button className="ml-2">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
