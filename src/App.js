import "./App.css";
import SignIn from "./components/SignIn";
import Quantity from "./components/ProdQuantity";
import Inventory from "./components/Inventory";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CreateProduct from "./components/CreateProduct";
import Users from "./components/Users";
import CreateUser from "./components/CreateUser";
import UserQuantity from "./components/UserQuantity"
import Userlayout from "./components/Userlayout";
function App() {
  return (
    <div className="App">
      <Router>
        <div className="container mx-auto p-4">
          <nav className="flex justify-between mb-4">
            {/* <Link to="/inventory" className="text-2xl font-bold">Inventory List</Link>
            <Link to="/qty" className="text-2xl font-bold">Inventory Quantity</Link>
            <Link to="/admin" className="text-2xl font-bold">Admin Panel</Link>
            <Link to="/signin" className="text-2xl font-bold">Signin Page</Link> */}
          </nav>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/prod-qty" element={<Quantity />} />
            <Route path="/user/:id" element={<Userlayout />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/users" element={<Users />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/user-qty" element={<UserQuantity />} />
            
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
