// components/CreateProduct.js
import React, { useState } from 'react';

const CreateProduct = ({ addProduct }) => {
  const [form, setForm] = useState({
    name: '',
    qr_code: '',
    category: '',
    purchase_date: '',
    warranty_period: '',
    condition: '',
    quantity:1,
  });

  const categories = [
    'Laptop',
    'Mouse',
    'Keyboard',
    'External Hard Drive',
    'USB Hub',
    'Laptop Bag',
    'Notebook',
    'Pen',
    'Highlighter',
    'Stapler',
    'Binder',
    'Desk Organizer',
    'Mouse Pad'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'quantity') {
      setForm({
        ...form,
        [name]: Math.max(1, Number(value))
      });
    } else {
      setForm({
        ...form,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(form);
    setForm({
      name: '',
      qr_code: '',
      category: '',
      purchase_date: '',
      warranty_period: '',
      condition: '',
      quantity:'',
    });
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
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">QR Code</label>
          <input
            type="text"
            name="qr_code"
            value={form.qr_code}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          >
            <option value="" disabled>Select a category</option>
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
            name="purchase_date"
            value={form.purchase_date}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Warranty Period</label>
          <input
            type="text"
            name="warranty_period"
            value={form.warranty_period}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Condition</label>
          <input
            type="text"
            name="condition"
            value={form.condition}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
