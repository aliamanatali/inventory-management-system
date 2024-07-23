import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Inventory from "./Inventory";
import Users from "./Users";

const AdminPanel = () => {
  const { id } = useParams();
  const [showInventory, setShowInventory] = useState(true);
  const userArray = [
    { name: "Alice Johnson", role: "Admin", email: "alice@example.com", id: "1", department: "IT" },
    { name: "Bob Smith", role: "IT Person", email: "bob@example.com", id: "2", department: "IT" },
    { name: "Carol White", role: "Employee", email: "carol@example.com", id: "3", department: "HR" },
    { name: "Dave Brown", role: "Admin", email: "dave@example.com", id: "4", department: "Finance" },
    { name: "Eve Davis", role: "IT Person", email: "eve@example.com", id: "5", department: "IT" },
    { name: "Frank Miller", role: "Employee", email: "frank@example.com", id: "6", department: "Marketing" }
  ];


  const user = userArray.find((user) => user.id === id);

  const handleToggle = () => {
    setShowInventory(!showInventory);
  };

  return (
    <div className="container-fluid m-5 justify-around">
      <div className="flex justify-between">
        <h1 className="text-5xl">Admin Dashboard </h1>
        <div>
          <p>Welcome back, <b>{user.name}</b></p>
        <p className="">User ID: {id} </p>
        </div>
        
      </div>

      <hr />

      <div className="flex items-end justify-end mt-5">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={!showInventory}
            onChange={handleToggle}
          />
          <span className="mr-3 text-sm font-medium text-gray-900 dark:text-green-600">
            Inventory
          </span>
          <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-green-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-yellow-600 peer-checked:bg-yellow-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-yellow-600">
            Users
          </span>
        </label>
      </div>

      <div className="container-fluid">
        {showInventory ? <Inventory /> : <Users />}
      </div>
    </div>
  );
};

export default AdminPanel;
