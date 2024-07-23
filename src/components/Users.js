import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Users = () => {
  const objArray = [
        { name: "Alice Johnson", role: "Admin", email: "alice@example.com", id: "1", department: "IT" },
        { name: "Bob Smith", role: "IT Person", email: "bob@example.com", id: "2", department: "IT" },
        { name: "Carol White", role: "Employee", email: "carol@example.com", id: "3", department: "HR" },
        { name: "Dave Brown", role: "Admin", email: "dave@example.com", id: "4", department: "Finance" },
        { name: "Eve Davis", role: "IT Person", email: "eve@example.com", id: "5", department: "IT" },
        { name: "Frank Miller", role: "Employee", email: "frank@example.com", id: "6", department: "Marketing" }
      ];

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
      <div className="grid grid-cols-5 gap-4 font-bold mb-2 text-yellow-600">
        <div>Name</div>
        <div>Email</div>
        <div>Department</div>
        <div>Role</div>
        <div>Operations</div>
      </div>
      {objArray.map((item, index) => (
        <div key={index} className="grid grid-cols-5 gap-4 p-4 border mb-2">
          <div>{item.name}</div>
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
