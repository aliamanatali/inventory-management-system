import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const categories = [
    "Laptop",
    "Keyboard",
    "External Hard Drive",
    "USB Hub",
    "Laptop Bag",
    "Notebook",
    "Pen",
    "Highlighter",
    "Binder",
    "Mouse",
    "Desk Organizer",
    "Mouse Pad",
    "Electronics"
  ];

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    qrCode: 0,
    category: categories[0], 
    purchaseDate: '',
    warrantyDate: '',
    condition: 'Excellent', 
    status: 'Available'
  });

  const [existingQrCodes, setExistingQrCodes] = useState([]);
  const [qrCodeError, setQrCodeError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/products');
        const qrCodes = response.data.map(product => product.qrCode);
        setExistingQrCodes(qrCodes);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });

    if (name === 'qrCode') {
      const isUnique = !existingQrCodes.includes(Number(value));
      setQrCodeError(isUnique ? '' : 'QR Code is already in use. Please use a different QR Code.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (qrCodeError) {
      alert("Please fix the errors before submitting.");
      return;
    }

    const productWithNumberQR = {
      ...product,
      qrCode: Number(product.qrCode)
    };

    try {
      const response = await axios.post('http://localhost:3001/api/products', productWithNumberQR);
      console.log('Product created:', response.data);
      alert('Product has been created successfully!');
      setProduct({
        name: '',
        qrCode: 0,
        category: categories[0],
        purchaseDate: '',
        warrantyDate: '',
        condition: 'Excellent',
        status: 'Available'
      });
      navigate(`/`);
    } catch (error) {
      console.error('Error creating product:', error.response?.data || error.message);
      alert('Error creating product. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <div className="flex">
        <button
          onClick={() => navigate(`/`)}
          className="mb-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Back
        </button>
      </div>
      <form onSubmit={handleSubmit} autoComplete="off">
        
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
          {qrCodeError && <p className="text-red-500">{qrCodeError}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
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
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
