import React, { useState, useEffect } from "react";
import axios from "axios";

const Quantity = () => {
  const [objArray, setObjArray] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    // Define an async function to fetch data
    const fetchProducts = async () => {
      try {
        // Send a GET request to your endpoint
        const response = await axios.get("http://localhost:3001/api/products");

        // Update state with the fetched data
        setObjArray(response.data);

        // Log fetched products
        console.log("Fetched products:", response.data);
      } catch (err) {
        // Handle any errors
        console.log("Error fetching products:", err.message);
      }
    };
    fetchProducts();
  }, []);

  const categories = [
    ...new Set(objArray.map((item) => item.category)),
    "All"
  ];

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredItems =
    selectedCategory === "All"
      ? objArray
      : objArray.filter((item) => item.category === selectedCategory);

  const quantity = filteredItems.length;

  return (
    <div className="container-fluid mx-auto p-4">
      <div className="flex justify-between mb-4">
        <b className="text-2xl">Inventory Quantity</b>
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="font-bold mr-2">
          Select Category:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border p-2 rounded"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <b className="text-xl">Total Quantity: {quantity}</b>
      </div>
      <div className="grid grid-cols-6 gap-4 font-bold mb-2">
        <div>Item Name</div>
        <div>Category</div>
        <div>Serial Number</div>
        <div>Purchase Date</div>
        <div>Warranty Period</div>
        <div>Condition</div>
      </div>
      {filteredItems.map((item, index) => (
        <div key={index} className="grid grid-cols-6 gap-4 p-4 border mb-2">
          <div>{item.name}</div>
          <div>{item.category}</div>
          <div>{item.qrCode}</div>
          <div>{new Date(item.purchaseDate).toLocaleDateString()}</div>
          <div>{new Date(item.warrantyDate).toLocaleDateString()}</div>
          <div>{item.condition}</div>
        </div>
      ))}
    </div>
  );
};

export default Quantity;
