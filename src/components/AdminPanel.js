import React, { useState } from "react";
import Inventory from "./Inventory";
import Users from "./Users";

const AdminPanel = () => {
  const [showInventory, setShowInventory] = useState(true);

  const handleToggleChange = () => {
    setShowInventory(!showInventory);
  };

  return (
    <div className="container-fluid m-5">
      <div className="flex items-start">
        <h1 className="text-5xl">Admin Panel</h1>
      </div>

      <hr />

      <div className="flex items-end justify-end mt-5">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={!showInventory}
            onChange={handleToggleChange}
            className="sr-only peer"
          />
          <span className="mr-3 text-sm font-medium text-gray-900 dark:text-green-600">Inventory</span>
          <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-green-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-yellow-600 peer-checked:bg-yellow-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-yellow-600">Users</span>
        </label>
      </div>

      <div className="container-fluid mt-5">
        {showInventory ? <Inventory /> : <Users />}
      </div>
    </div>
  );
};

export default AdminPanel;
