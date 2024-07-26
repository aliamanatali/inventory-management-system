import "./App.css";
import SignIn from "./components/SignIn";
import Quantity from "./components/ProdQuantity";
import Inventory from "./components/Inventory";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import CreateProduct from "./components/CreateProduct";
import Users from "./components/Users";
import CreateUser from "./components/CreateUser";
import UserQuantity from "./components/UserQuantity"
import Userlayout from "./components/Userlayout";
import Requests from "./components/HandleRequests";
import UserRequests from "./components/UserRequests"
function App() {
  return (
    <div className="App">
      <Router>
        <div className="container mx-auto p-4">
          <nav className="flex justify-between mb-4">
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
            <Route path="/requests" element={<Requests/>}/>
            <Route path="/req" element={<UserRequests/>}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
