import React, { useState, useEffect } from "react";
import axios from "axios";

const AssignModal = ({ product, onClose }) => {
  const [userId, setUserId] = useState("");
  const [category, setCategory] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [productName, setProductName] = useState("");
  const [userName, setUserName] = useState("");
  const [date, setDate] = useState("");
  const [additionalItems, setAdditionalItems] = useState({
    laptopBag: { checked: false, qrCode: "", name: "" },
    charger: { checked: false, qrCode: "", name: "" },
    mouse: { checked: false, qrCode: "", name: "" },
  });
  const [objArray, setObjArray] = useState([]);
  const [userArray, setUserArray] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/products");
        setObjArray(response.data);
        console.log("Fetched products:", response.data);
      } catch (err) {
        console.log("Error fetching products:", err.message);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/users");
        setUserArray(response.data);
        console.log("Fetched users:", response.data);
      } catch (err) {
        console.log("Error fetching users:", err.message);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setDate(currentDate);
  }, []);

  const categories = [...new Set(objArray.map((item) => item.category))];

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    if (selectedCategory === "Laptop") {
      setAdditionalItems((prev) => ({
        laptopBag: { ...prev.laptopBag, checked: false },
        charger: { ...prev.charger, checked: false },
        mouse: { ...prev.mouse, checked: false },
      }));
    }
  };

  const handleQrCodeChange = (e) => {
    const qrCodeValue = e.target.value;
    setQrCode(qrCodeValue);

    const matchedProduct = objArray.find(
      (item) => item.qrCode === parseInt(qrCodeValue, 10)
    );
    if (matchedProduct) {
      setProductName(matchedProduct.name);
      console.log("Matched product:", matchedProduct);
    } else {
      setProductName("");
      console.log("No product matched with QR code:", qrCodeValue);
    }
  };

  const handleUserIdChange = (e) => {
    const userIdValue = e.target.value;
    setUserId(userIdValue);

    const matchedUser = userArray.find((user) => user.id === parseInt(userIdValue, 10));
    if (matchedUser) {
      setUserName(matchedUser.name);
      console.log("Matched user:", matchedUser);
    } else {
      setUserName("");
      console.log("No user matched with ID:", userIdValue);
    }
  };

  const findProductIdByQrCode = (qrCode) => {
    // Find the product object with the given QR code
    const product = objArray.find(item => item.qrCode === parseInt(qrCode, 10));
    
    // If the product is found, return its ID
    return product ? product.id : null;
  };

  const handleAssign = async () => {
    if (!qrCode || !userId || !userName || !productName) {
      alert("Please fill in all the fields.");
      return;
    }
  
    const productId = findProductIdByQrCode(qrCode);
    
    // Insert primary product assignment
    const primaryPayload = {
      productId,
      userId,
    };
  
    try {
      await axios.post("http://localhost:3001/api/assign", primaryPayload);
      console.log("Primary product assigned:", primaryPayload);
  
      // Insert additional items if category is "Laptop"
      if (category === "Laptop") {
        for (const [details] of Object.entries(additionalItems)) {
          if (details.checked && details.qrCode) {
            const additionalProductId = findProductIdByQrCode(details.qrCode);
            if (additionalProductId) {
              const additionalPayload = {
                productId: additionalProductId,
                userId,
              };
  
              await axios.post("http://localhost:3001/api/assign", additionalPayload);
              console.log("Additional item assigned:", additionalPayload);
            }
          }
        }
      }
  
      onClose(); // Close the modal after assignment
    } catch (err) {
      console.log("Error assigning:", err.message);
    }
  };
    const handleAdditionalItemChange = (item) => (e) => {
    const { name, value } = e.target;
    setAdditionalItems((prev) => ({
      ...prev,
      [item]: { ...prev[item], [name]: value },
    }));

    if (name === "qrCode") {
      const matchedProduct = objArray.find(
        (prod) => prod.qrCode === parseInt(value, 10) && prod.category === "Laptop " + item.charAt(0).toUpperCase() + item.slice(1)
      );
      setAdditionalItems((prev) => ({
        ...prev,
        [item]: { ...prev[item], name: matchedProduct ? matchedProduct.name : "" },
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded">
        <h2 className="text-xl font-bold mb-4">Assign Product</h2>
        <div className="mb-4">
          <label className="block mb-2">Product Information:</label>
          <select
            value={category}
            onChange={handleCategoryChange}
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
              type="number"
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

          <label className="block mt-4 mb-2">User Information:</label>
          <div className="flex">
            <input
              type="number"
              value={userId}
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

          <label className="block mt-4 mb-2">Date:</label>
          <input
            type="date"
            value={date}
            required
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded w-1/3"
          />

          {category === "Laptop" && (
            <div className="mt-4">
              <label className="block mb-2">Additional Items:</label>

              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={additionalItems.laptopBag.checked}
                  onChange={() =>
                    setAdditionalItems((prev) => ({
                      ...prev,
                      laptopBag: {
                        ...prev.laptopBag,
                        checked: !prev.laptopBag.checked,
                      },
                    }))
                  }
                  id="laptopBag"
                />
                <label htmlFor="laptopBag" className="ml-2">
                  Laptop Bag
                </label>
              </div>
              {additionalItems.laptopBag.checked && (
                <div className="flex">
                  <input
                    type="number"
                    name="qrCode"
                    value={additionalItems.laptopBag.qrCode}
                    onChange={handleAdditionalItemChange("laptopBag")}
                    placeholder="Enter Laptop Bag QR Code"
                    className="border p-2 ml-4 rounded"
                  />
                  <input
                    type="text"
                    value={additionalItems.laptopBag.name}
                    readOnly
                    placeholder="Laptop Bag Name"
                    className="border p-2 ml-2 rounded"
                  />
                </div>
              )}

              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={additionalItems.charger.checked}
                  onChange={() =>
                    setAdditionalItems((prev) => ({
                      ...prev,
                      charger: {
                        ...prev.charger,
                        checked: !prev.charger.checked,
                      },
                    }))
                  }
                  id="charger"
                />
                <label htmlFor="charger" className="ml-2">
                  Charger
                </label>
              </div>
              {additionalItems.charger.checked && (
                <div className="flex">
                  <input
                    type="number"
                    name="qrCode"
                    value={additionalItems.charger.qrCode}
                    onChange={handleAdditionalItemChange("charger")}
                    placeholder="Enter Charger QR Code"
                    className="border p-2 ml-4 rounded"
                  />
                  <input
                    type="text"
                    value={additionalItems.charger.name}
                    readOnly
                    placeholder="Charger Name"
                    className="border p-2 ml-2 rounded"
                  />
                </div>
              )}

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={additionalItems.mouse.checked}
                  onChange={() =>
                    setAdditionalItems((prev) => ({
                      ...prev,
                      mouse: {
                        ...prev.mouse,
                        checked: !prev.mouse.checked,
                      },
                    }))
                  }
                  id="mouse"
                />
                <label htmlFor="mouse" className="ml-2">
                  Mouse
                </label>
              </div>
              {additionalItems.mouse.checked && (
                <div className="flex">
                  <input
                    type="number"
                    name="qrCode"
                    value={additionalItems.mouse.qrCode}
                    onChange={handleAdditionalItemChange("mouse")}
                    placeholder="Enter Mouse QR Code"
                    className="border p-2 ml-4 rounded"
                  />
                  <input
                    type="text"
                    value={additionalItems.mouse.name}
                    readOnly
                    placeholder="Mouse Name"
                    className="border p-2 ml-2 rounded"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end">
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
    </div>
  );
};

export default AssignModal;
