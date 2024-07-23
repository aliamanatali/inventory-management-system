import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Inventory from "./Inventory";
import Users from "./Users";

const ItDashboard = () => {
  const { id } = useParams();
  const [showInventory, setShowInventory] = useState(true);
  const userArray = [
    {
      name: "Alice Johnson",
      role: "Admin",
      email: "alice@example.com",
      id: "1",
      department: "IT",
    },
    {
      name: "Bob Smith",
      role: "IT Person",
      email: "bob@example.com",
      id: "2",
      department: "IT",
    },
    {
      name: "Carol White",
      role: "Employee",
      email: "carol@example.com",
      id: "3",
      department: "HR",
    },
    {
      name: "Dave Brown",
      role: "Admin",
      email: "dave@example.com",
      id: "4",
      department: "Finance",
    },
    {
      name: "Eve Davis",
      role: "IT Person",
      email: "eve@example.com",
      id: "5",
      department: "IT",
    },
    {
      name: "Frank Miller",
      role: "Employee",
      email: "frank@example.com",
      id: "6",
      department: "Marketing",
    },
  ];

  const user = userArray.find((user) => user.id === id);

  return (
    <div className="container-fluid m-5 justify-around">
      <div className="flex justify-between">
        <h1 className="text-5xl">IT Dashboard </h1>
        <div>
          <p>Welcome back, <b>{user.name}</b></p>
          <p className="">User ID: {id} </p>
        </div>
      </div>

      <hr />

      <div className="container-fluid">
        <Inventory role={user.role}/>
      </div>
    </div>
  );
};

export default ItDashboard;
