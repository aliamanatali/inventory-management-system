import React, { useState, useEffect } from 'react';
import AdminDashboard from './AdminDashboard';
import ItDashboard from './ItDashboard';
import UserDashboard from './UserDashboard';

const Userlayout = () => {
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    console.log("This user is a", storedUser.role);
    setRole(storedUser.role);
  }, []);

  if (!role) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container-fluid'>
      {role === 'Admin' && <AdminDashboard />}
      {role === 'IT Person' && <ItDashboard />}
      {role === 'Employee' && <UserDashboard />}
    </div>
  );
};

export default Userlayout;
