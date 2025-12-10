import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import AddProduct from "./pages/AddProduct";
import Products from "./pages/Products";
import Home from "./pages/Home";
import Matches from "./pages/Matches";
import AddMatch from "./pages/AddMatch";

const App = () => {
  return (
    <Router>
      <div className="app">
        <div className="content">
          <Routes>
            {/* Redirect "/" to "/products" */}
            <Route path="/" element={<Navigate to="/products" replace />} />
            {/* <Route path="/" element={<Home/>} /> */}
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/products" element={<Products />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/add" element={<AddMatch />} />

            {/* Fallback route for unknown paths */}
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
