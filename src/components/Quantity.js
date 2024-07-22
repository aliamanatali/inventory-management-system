import React, { useState } from "react";

const Quantity = () => {
    const objArray = [
        { name: "MacBook Pro", qr_code: "123", category: "Laptop", purchase_date: "2023-01-15", warranty_period: "1 year", condition: "New" },
        { name: "Dell XPS 13", qr_code: "124", category: "Laptop", purchase_date: "2023-02-10", warranty_period: "1 year", condition: "New" },
        { name: "Lenovo ThinkPad X1", qr_code: "125", category: "Laptop", purchase_date: "2023-03-05", warranty_period: "2 years", condition: "New" },
        { name: "HP Spectre x360", qr_code: "126", category: "Laptop", purchase_date: "2023-04-20", warranty_period: "1 year", condition: "New" },
        { name: "Acer Swift 3", qr_code: "127", category: "Laptop", purchase_date: "2023-05-15", warranty_period: "1 year", condition: "New" },
        { name: "Asus ZenBook 14", qr_code: "128", category: "Laptop", purchase_date: "2023-06-01", warranty_period: "1 year", condition: "New" },
        { name: "Microsoft Surface Laptop 4", qr_code: "129", category: "Laptop", purchase_date: "2023-07-22", warranty_period: "1 year", condition: "New" },
        { name: "Razer Blade 15", qr_code: "130", category: "Laptop", purchase_date: "2023-08-18", warranty_period: "1 year", condition: "New" },
        { name: "MacBook Air", qr_code: "131", category: "Laptop", purchase_date: "2023-09-10", warranty_period: "1 year", condition: "New" },
        { name: "HP Envy x360", qr_code: "132", category: "Laptop", purchase_date: "2023-10-05", warranty_period: "1 year", condition: "New" },
        { name: "Dell Mouse 1", qr_code: "456", category: "Mouse", purchase_date: "2022-11-20", warranty_period: "1 year", condition: "Used" },
        { name: "Dell Keyboard 1", qr_code: "457", category: "Keyboard", purchase_date: "2023-01-10", warranty_period: "1 year", condition: "New" },
        { name: "Seagate External Hard Drive", qr_code: "458", category: "External Hard Drive", purchase_date: "2023-02-25", warranty_period: "2 years", condition: "New" },
        { name: "Anker USB Hub", qr_code: "459", category: "USB Hub", purchase_date: "2023-03-30", warranty_period: "1 year", condition: "New" },
        { name: "Targus Laptop Bag", qr_code: "460", category: "Laptop Bag", purchase_date: "2023-04-15", warranty_period: "1 year", condition: "New" },
        { name: "Moleskine Notebook", qr_code: "789", category: "Notebook", purchase_date: "2023-05-10", warranty_period: "N/A", condition: "New" },
        { name: "Pilot Pen", qr_code: "101", category: "Pen", purchase_date: "2023-06-05", warranty_period: "N/A", condition: "New" },
        { name: "Stabilo Highlighter", qr_code: "102", category: "Highlighter", purchase_date: "2023-07-12", warranty_period: "N/A", condition: "New" },
        { name: "Swingline Stapler", qr_code: "103", category: "Stapler", purchase_date: "2023-08-23", warranty_period: "N/A", condition: "New" },
        { name: "Avery Binder", qr_code: "104", category: "Binder", purchase_date: "2023-09-14", warranty_period: "N/A", condition: "New" },
        { name: "Generic Mouse", qr_code: "113", category: "Mouse", purchase_date: "2022-09-18", warranty_period: "1 year", condition: "Used" },
        { name: "Ikea Desk Organizer", qr_code: "461", category: "Desk Organizer", purchase_date: "2023-10-01", warranty_period: "N/A", condition: "New" },
        { name: "Logitech Mouse Pad", qr_code: "462", category: "Mouse Pad", purchase_date: "2023-10-20", warranty_period: "N/A", condition: "New" }
    ];
    

  const [selectedCategory, setSelectedCategory] = useState("All");

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
          <div>{item.qr_code}</div>
          <div>{item.purchase_date}</div>
          <div>{item.warranty_period}</div>
          <div>{item.condition}</div>
        </div>
      ))}
    </div>
  );
};

export default Quantity;
