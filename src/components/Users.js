import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Users = () => {
  const objArray = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Employee",
    },
    {
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      role: "IT Person",
    },
    {
      name: "Emily Davis",
      email: "emily.davis@example.com",
      role: "Employee",
    },
    {
      name: "William Brown",
      email: "william.brown@example.com",
      role: "Admin",
    },
  ];

  return (
    <div className="container-fluid mx-auto p-4">
      <div className="flex justify-between mb-4">
        <b className="text-2xl">User List</b>

        <div>
          <Link to="/create-user">
            <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border">
              Add User
            </button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 font-bold mb-2">
        <div>Name</div>
        <div>Email</div>
        <div>Role</div>
        <div>Operations</div>
      </div>
      {objArray.map((item, index) => (
        <div key={index} className="grid grid-cols-4 gap-4 p-4 border mb-2">
          <div>{item.name}</div>
          <div>{item.email}</div>
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
