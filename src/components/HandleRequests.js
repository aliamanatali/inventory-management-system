import React, {useState} from "react";
import AssignModal from "./AssignModal";

const Requests = () => {
  const [Modal, setModal] = useState(false);

  const getUserById = (id) => {
    return userArray.find((user) => user.id === id);
  };

  const handleModal = (flag) => {
    setModal(flag);
  };

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

  const req = [
    {
      req_id: "1",
      category: "Laptop",
      reason: "Mere ko mac do mjhy nai pta",
      id: "1",
    },
    {
      req_id: "2",
      category: "Bag",
      reason:
        "Pichla bag chor le gae, new deden phr se nai ghumanga, Pakka :') ",
      id: "2",
    },
    {
      req_id: "3",
      category: "Mouse",
      reason: "I need a mouse my laptop's pointing pad isn't working",
      id: "3",
    },
  ];

  return (
    <div className="container-fluid flex flex-col items-center">
      <h3 className="mb-4 text-3xl">
        <strong>Requests</strong>
      </h3>
      {req.length > 0 ? (
        req.map((request) => {
          const user = getUserById(request.id);
          return (
            <div
              key={request.req_id}
              className="card mb-3 p-5  lg:w-1/3 md:w-2/3 sm:w-1/2 w-2/3 bg-slate-100 text-left"
            >
              <p className="card-text">
                <strong>Requested Item:</strong> {request.category}
              </p>
              <hr />
              <p className="card-title mt-3">
                <strong>Name: </strong>
                {user.name} <strong>Role:</strong> {user.role}
              </p>
              <p className="card-text">
                <strong>Reason:</strong> {request.reason}
              </p>
              <div className=" flex justify-center">
                <button
                  onClick={()=>handleModal(true)}
                  className=" bg-green-500 text-white mt-2 rounded px-3 py-1"
                >
                  Accept
                </button>
                <button className=" bg-red-700 text-white mt-2 ml-2 rounded px-4 py-2">
                  Reject
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p>No requests available.</p>
      )}
      {Modal && <AssignModal product={Modal} onClose={() => setModal(null)} />}
    </div>
  );
};

export default Requests;
