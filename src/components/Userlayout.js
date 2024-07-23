import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import ItDashboard from './ItDashboard';

const Userlayout = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = () => {
        const userArray = [
            { name: "Alice Johnson", role: "Admin", email: "alice@example.com", id: "1", department: "IT" },
            { name: "Bob Smith", role: "IT Person", email: "bob@example.com", id: "2", department: "IT" },
            { name: "Carol White", role: "Employee", email: "carol@example.com", id: "3", department: "HR" },
            { name: "Dave Brown", role: "Admin", email: "dave@example.com", id: "4", department: "Finance" },
            { name: "Eve Davis", role: "IT Person", email: "eve@example.com", id: "5", department: "IT" },
            { name: "Frank Miller", role: "Employee", email: "frank@example.com", id: "6", department: "Marketing" }
          ];
    
      // Find user by ID
      const foundUser = userArray.find(user => user.id === id);
      setUser(foundUser);
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container-fluid'>
      {user.role === 'Admin' && <AdminDashboard />}
      {user.role === 'IT Person' && <ItDashboard />}
      {user.role === 'Employee' && <AdminDashboard />}
    </div>
  );
};

export default Userlayout;
