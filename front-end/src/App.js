import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AddProduct from "./pages/AddProduct";
import Products from "./pages/Products";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <div className="app">
        <div className="content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/addProduct' element={<AddProduct />} />
            <Route path='/products' element={<Products />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;