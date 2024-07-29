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
  const [editProduct, setEditProduct] = useState(null);  // State for managing the product to be edited

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

  const handleEditProduct = (product) => {
    console.log(product)
    setEditProduct(product); // Set the product to be edited
  };

  const handleUpdateProduct = async (event) => {
    event.preventDefault();
    const { id, name, qrCode, category, purchaseDate, warrantyDate, condition, status } = editProduct;
  
    try {
      const response = await axios.put(`http://localhost:3001/api/products/${id}`, {
        name,
        qrCode,
        category,
        purchaseDate,
        warrantyDate,
        condition,
        status
      });
  
      setObjArray(objArray.map((item) =>
        item.id === id ? response.data : item
      ));
  
      setEditProduct(null); // Close the edit form
    } catch (err) {
      console.log("Error updating product:", err.message);
    }
  };
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
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
            <button onClick={() => handleEditProduct(item)}>
              <FontAwesomeIcon icon={faCheckSquare} />
            </button>
            <button onClick={() => handleDeleteProduct(item.id)} className="ml-2">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      ))}
      {editProduct && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <form onSubmit={handleUpdateProduct}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={editProduct.name || ""}
                  onChange={handleInputChange}
                  className="border p-2 mb-2 w-full"
                />
              </label>
              <label>
                QR Code:
                <input
                  type="text"
                  name="qrCode"
                  value={editProduct.qrCode || ""}
                  onChange={handleInputChange}
                  className="border p-2 mb-2 w-full"
                />
              </label>
              <label>
                Category:
                <input
                  type="text"
                  name="category"
                  value={editProduct.category || ""}
                  onChange={handleInputChange}
                  className="border p-2 mb-2 w-full"
                />
              </label>
              <label>
                Purchase Date:
                <input
                  type="date"
                  name="purchaseDate"
                  value={editProduct.purchaseDate ? format(new Date(editProduct.purchaseDate), 'yyyy-MM-dd') : ""}
                  onChange={handleInputChange}
                  className="border p-2 mb-2 w-full"
                />
              </label>
              <label>
                Warranty Date:
                <input
                  type="date"
                  name="warrantyDate"
                  value={editProduct.warrantyDate ? format(new Date(editProduct.warrantyDate), 'yyyy-MM-dd') : ""}
                  onChange={handleInputChange}
                  className="border p-2 mb-2 w-full"
                />
              </label>
              <label>
                Condition:
                <input
                  type="text"
                  name="condition"
                  value={editProduct.condition || ""}
                  onChange={handleInputChange}
                  className="border p-2 mb-2 w-full"
                />
              </label>
              <label>
                Status:
                <input
                  type="text"
                  name="status"
                  value={editProduct.status || ""}
                  onChange={handleInputChange}
                  className="border p-2 mb-2 w-full"
                />
              </label>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditProduct(null)}
                className="ml-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

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
