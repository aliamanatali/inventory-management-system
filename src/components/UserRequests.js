import React, { useState, useEffect } from "react";

const UserRequests = ({ onClose, onAddTicket, userArray }) => {
  const [category, setCategory] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [reason, setReason] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // const pendingRequests = [
  //   {
  //     category:"Laptop",
  //     employeeId:"1",
  //     employeeName:"Alice Jhonson",
  //     reason:"Chahie",
  //     status:"Pending",
  //   }
  // ]
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
  const categories = [...new Set(objArray.map((item) => item.category))];

  useEffect(() => {
    const user = userArray.find((user) => user.id === employeeId);
    if (user) {
      setEmployeeName(user.name);
    } else {
      setEmployeeName("");
    }
  }, [employeeId, userArray]);

  const status = "Pending";

  const handleGenerate = () => {
    if (!category || !employeeId || !employeeName || !reason) {
      setErrorMessage("All fields are compulsory.");
      return;
    }

    const ticket = {
      category,
      employeeId,
      employeeName,
      reason,
      status,
    };
    onAddTicket(ticket);
    setCategory("");
    setEmployeeId("");
    setEmployeeName("");
    setReason("");
    setErrorMessage("");
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-slate-100 p-4 rounded">
        <h2 className="text-xl font-bold mb-4">Request Product</h2>
        <div className="mb-4">
          <label className="block mb-2">Product Information:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded w-full"
            required
          >
            <option value="">Select Product Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <label className="block mt-4 mb-2">User Information:</label>
          <div className="flex">
            <input
              type="text"
              placeholder="Enter Employee ID"
              className="border p-2 rounded w-full"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Employee Name"
              value={employeeName}
              readOnly
              required
              className="border p-2 ml-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block mt-4 mb-2">Reason:</label>
            <input
              type="text"
              placeholder="Reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              className="border p-2 rounded w-full"
            />
          </div>
          {errorMessage && (
            <div className="text-red-500 mt-2">{errorMessage}</div>
          )}
        </div>
        <button
          onClick={handleGenerate}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Generate
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

export default UserRequests;
