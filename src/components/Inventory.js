import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faTrash, faBell } from "@fortawesome/free-solid-svg-icons";
import AssignModal from "./AssignModal";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns';

const Inventory = (props) => {
  const { role } = props;
  const [Modal, setModal] = useState(false);
  const [objArray, setObjArray] = useState([]);
  
  const handleAssign = (flag) => {
    setModal(flag);
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/products");
      setObjArray(response.data);
      console.log("Fetched products:", response.data);
    } catch (err) {
      console.log("Error fetching products:", err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/products/${id}`);
      setObjArray(objArray.filter((item) => item.id !== id));
    } catch (err) {
      console.log("Error deleting product:", err.message);
    }
  };

  return (
    <div className="container-fluid mx-auto p-4">
      <div className="flex justify-between mb-4">
        <b className="text-3xl text-green-600">Inventory List</b>
        <div>
          {role === "IT Person" ? (
            <span>
              <Link to={'/requests'}>
                <button className="bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded border">
                  <FontAwesomeIcon icon={faBell} />
                </button>
              </Link>
              <button
                onClick={() => handleAssign(true)}
                className="bg-green-600 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border"
              >
                Assign
              </button>
            </span>
          ) : null}
          <Link to="/prod-qty">
            <button className="bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border">
              Qty
            </button>
          </Link>
          <Link to="/create-product">
            <button className="bg-green-600 hover:bg-blue-700 text-white font-bold py-2 ml-2 px-4 rounded border">
              Add Product
            </button>
          </Link>
          <Link to="/signin">
            <button className="bg-green-600 hover:bg-blue-700 text-white font-bold py-2 ml-2 px-4 rounded border">
              Logout
            </button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-8 gap-4 font-bold mb-2 text-green-600">
        <div>Item Name</div>
        <div>Category</div>
        <div>Serial Number</div>
        <div>Purchase Date</div>
        <div>Warranty Period</div>
        <div>Condition</div>
        <div>Status</div>
        <div>Operations</div>
      </div>
      {objArray.map((item, index) => (
        <div key={index} className="grid grid-cols-8 gap-4 p-4 border mb-2">
          <div>{item.name}</div>
          <div>{item.category}</div>
          <div>{item.qrCode}</div>
          <div>{format(new Date(item.purchaseDate), 'dd-MM-yyyy')}</div>
          <div>{format(new Date(item.warrantyDate), 'dd-MM-yyyy')}</div>
          <div>{item.condition}</div>
          <div>{item.status}</div>
          <div>
            <button>
              <FontAwesomeIcon icon={faCheckSquare} />
            </button>
            <button onClick={() => handleDeleteProduct(item.id)} className="ml-2">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      ))}
      {Modal && (
        <AssignModal
          product={Modal}
          onClose={() => setModal(null)} 
        />
      )}
    </div>
  );
};

export default Inventory;
