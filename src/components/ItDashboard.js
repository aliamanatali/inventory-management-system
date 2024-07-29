import React, { useEffect, useState } from "react";
import Inventory from "./Inventory";

const ItDashboard = () => {
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
      setUser(storedUser);
    console.log("Stored user:", storedUser);
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid m-5 justify-around">
      <div className="flex justify-between">
        <h1 className="text-5xl">IT Dashboard</h1>
        <div>
          <p>
            Welcome back, <b>{user.name}</b>
          </p>
          <p>User ID: {user.id}</p>
        </div>
      </div>

      <hr />

      <div className="container-fluid">
        <Inventory role={user.role} />
      </div>
    </div>
  );
};

export default ItDashboard;
