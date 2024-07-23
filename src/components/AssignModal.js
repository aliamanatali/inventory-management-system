

  import React, { useState, useEffect } from "react";

  const AssignModal = ({ product, onClose }) => {
    const [assignee, setAssignee] = useState(""); // State to manage assignee
    const [category, setCategory] = useState(""); // State to manage category
    const [qrCode, setQrCode] = useState(""); // State to manage QR code
    const [productName, setProductName] = useState(""); // State to display product name
    const [userName, setUserName] = useState(""); // State to display user name
    const [date, setDate] = useState(""); // State to manage date
  
    
const objArray = [
    {
      name: "MacBook Pro",
      qr_code: "123",
      category: "Laptop",
      purchase_date: "2023-01-15",
      warranty_period: "1 year",
      condition: "New",
      status: "In use",
    },
    {
      name: "Dell XPS 13",
      qr_code: "124",
      category: "Laptop",
      purchase_date: "2023-02-10",
      warranty_period: "1 year",
      condition: "New",
      status: "In use",
    },
    {
      name: "Lenovo ThinkPad X1",
      qr_code: "125",
      category: "Laptop",
      purchase_date: "2023-03-05",
      warranty_period: "2 years",
      condition: "New",
      status: "In use",
    },
    {
      name: "HP Spectre x360",
      qr_code: "126",
      category: "Laptop",
      purchase_date: "2023-04-20",
      warranty_period: "1 year",
      condition: "New",
      status: "In use",
    },
    {
      name: "Acer Swift 3",
      qr_code: "127",
      category: "Laptop",
      purchase_date: "2023-05-15",
      warranty_period: "1 year",
      condition: "New",
      status: "In use",
    },
    {
      name: "Asus ZenBook 14",
      qr_code: "128",
      category: "Laptop",
      purchase_date: "2023-06-01",
      warranty_period: "1 year",
      condition: "New",
      status: "In use",
    },
    {
      name: "Microsoft Surface Laptop 4",
      qr_code: "129",
      category: "Laptop",
      purchase_date: "2023-07-22",
      warranty_period: "1 year",
      condition: "New",
      status: "In use",
    },
    {
      name: "Razer Blade 15",
      qr_code: "130",
      category: "Laptop",
      purchase_date: "2023-08-18",
      warranty_period: "1 year",
      condition: "New",
      status: "In use",
    },
    {
      name: "MacBook Air",
      qr_code: "131",
      category: "Laptop",
      purchase_date: "2023-09-10",
      warranty_period: "1 year",
      condition: "New",
      status: "In use",
    },
    {
      name: "HP Envy x360",
      qr_code: "132",
      category: "Laptop",
      purchase_date: "2023-10-05",
      warranty_period: "1 year",
      condition: "New",
      status: "In use",
    },
    {
      name: "Dell Mouse 1",
      qr_code: "456",
      category: "Mouse",
      purchase_date: "2022-11-20",
      warranty_period: "1 year",
      condition: "Used",
      status: "In use",
    },
    {
      name: "Dell Keyboard 1",
      qr_code: "457",
      category: "Keyboard",
      purchase_date: "2023-01-10",
      warranty_period: "1 year",
      condition: "New",
      status: "In use",
    },
    {
      name: "Seagate External Hard Drive",
      qr_code: "458",
      category: "External Hard Drive",
      purchase_date: "2023-02-25",
      warranty_period: "2 years",
      condition: "New",
      status: "In use",
    },
    {
      name: "Anker USB Hub",
      qr_code: "459",
      category: "USB Hub",
      purchase_date: "2023-03-30",
      warranty_period: "1 year",
      condition: "New",
      status: "In use",
    },
    {
      name: "Targus Laptop Bag",
      qr_code: "460",
      category: "Laptop Bag",
      purchase_date: "2023-04-15",
      warranty_period: "1 year",
      condition: "New",
      status: "In use",
    },
    {
      name: "Moleskine Notebook",
      qr_code: "789",
      category: "Notebook",
      purchase_date: "2023-05-10",
      warranty_period: "N/A",
      condition: "New",
      status: "In repair",
    },
    {
      name: "Pilot Pen",
      qr_code: "101",
      category: "Pen",
      purchase_date: "2023-06-05",
      warranty_period: "N/A",
      condition: "New",
      status: "In use",
    },
    {
      name: "Stabilo Highlighter",
      qr_code: "102",
      category: "Highlighter",
      purchase_date: "2023-07-12",
      warranty_period: "N/A",
      condition: "New",
      status: "In use",
    },

    {
      name: "Swingline Stapler",
      qr_code: "103",
      category: "Stapler",
      purchase_date: "2023-08-23",
      warranty_period: "N/A",
      condition: "New",
      status: "In use",
    },
    {
      name: "Avery Binder",
      qr_code: "104",
      category: "Binder",
      purchase_date: "2023-09-14",
      warranty_period: "N/A",
      condition: "New",
      status: "In use",
    },
    {
      name: "Generic Mouse",
      qr_code: "113",
      category: "Mouse",
      purchase_date: "2022-09-18",
      warranty_period: "1 year",
      condition: "Used",
      status: "In use",
    },
    {
      name: "Ikea Desk Organizer",
      qr_code: "461",
      category: "Desk Organizer",
      purchase_date: "2023-10-01",
      warranty_period: "N/A",
      condition: "New",
      status: "In use",
    },
    {
      name: "Logitech Mouse Pad",
      qr_code: "462",
      category: "Mouse Pad",
      purchase_date: "2023-10-20",
      warranty_period: "N/A",
      condition: "New",
      status: "Availiable",
    },
  ];
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
  
    // Set the current date as the default value in the date input field
    useEffect(() => {
      const currentDate = new Date().toISOString().split("T")[0];
      setDate(currentDate);
    }, []);
  
    // Fetch unique categories from objArray
    const categories = [...new Set(objArray.map((item) => item.category))];
  
    const handleQrCodeChange = (e) => {
      const qrCodeValue = e.target.value;
      setQrCode(qrCodeValue);
  
      const matchedProduct = objArray.find((item) => item.qr_code === qrCodeValue);
      if (matchedProduct) {
        setProductName(matchedProduct.name);
      } else {
        setProductName("");
      }
    };
  
    const handleUserIdChange = (e) => {
      const userIdValue = e.target.value;
      setAssignee(userIdValue);
  
      const matchedUser = userArray.find((user) => user.id === userIdValue);
      if (matchedUser) {
        setUserName(matchedUser.name);
      } else {
        setUserName("");
      }
    };
  
    const handleAssign = () => {
      // Implement the assignment logic here
      console.log(`Assigning ${product.name} to ${assignee}`);
      onClose(); // Close the modal after assignment
    };
  
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded">
          <h2 className="text-xl font-bold mb-4">Assign Product</h2>
          <div className="mb-4">
          <label className="block mb-2">Product Information:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="">Select Product Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
  
            <div className="flex justify-around mt-5">
            <input
              type="text"
              value={qrCode}
              required
              onChange={handleQrCodeChange}
              placeholder="Enter Product's QR-Code"
              className="border p-2 rounded w-70"
          />
            <input
              type="text"
              value={productName}
              placeholder="Product Name"
              required
              readOnly
              className="border p-2 ml-2 rounded w-70"
            />
  
            </div>
            <label className="block mt-4 mb-2" >User Information:</label>
            <div className="flex">
            <input
              type="text"
              value={assignee}
              onChange={handleUserIdChange}
              placeholder="Enter Employee ID"
              className="border p-2 rounded w-full"
              required
            />

            <input
              type="text"
              value={userName}
              placeholder="Employee Name"
              readOnly
              required
              className="border p-2 ml-2 rounded w-full"
            />
            </div>
            {
                
            }
            <label className="block mt-4 mb-2">Date:</label>
            <input
              type="date"
              value={date}
              required
              onChange={(e) => setDate(e.target.value)}
              className="border p-2 rounded w-1/3"
            />
          </div>
          <button
            onClick={handleAssign}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Assign
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };
  
  export default AssignModal;
  