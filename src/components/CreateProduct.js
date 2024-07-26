import React, { useState } from 'react';
import axios from 'axios';

const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    qrCode: 0,
    category: '',
    purchaseDate: '',
    warrantyDate: '',
    condition: 'Excellent', // default value
    status: 'Available' // default value
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productWithNumberQR = {
      ...product,
      qrCode: Number(product.qrCode)  // Convert to number
    };
    console.log(productWithNumberQR);
    try {
      const response = await axios.post('http://localhost:3001/api/products', productWithNumberQR);
      console.log('Product created:', response.data);
      // Optionally clear the form or show a success message
      setProduct({
        name: '',
        qrCode: 0,
        category: '',
        purchaseDate: '',
        warrantyDate: '',
        condition: 'Excellent',
        status: 'Available'
      });
    } catch (error) {
      console.error('Error creating product:', error);
      // Optionally show an error message
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">QR Code</label>
          <input
            type="number"
            name="qrCode"
            value={product.qrCode}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Purchase Date</label>
          <input
            type="date"
            name="purchaseDate"
            value={product.purchaseDate}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Warranty Date</label>
          <input
            type="date"
            name="warrantyDate"
            value={product.warrantyDate}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Condition</label>
          <select
            name="condition"
            value={product.condition}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          >
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Poor">Poor</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Status</label>
          <select
            name="status"
            value={product.status}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          >
            <option value="Available">Available</option>
            <option value="In use">In use</option>
            <option value="In repair">In repair</option>
          </select>
        </div>
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
