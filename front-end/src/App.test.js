import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Navbar from './components/Navbar';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import ProductUpdate from './components/ProductUpdate';
import AddProduct from './pages/AddProduct';
import Home from './pages/Home';
import Products from './pages/Products';

describe('Frontend smoke tests', () => {
  test('App renders without crashing', () => {
    const { container } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(container).toBeTruthy();
  });

  test('Navbar renders without crashing', () => {
    const { container } = render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    expect(container).toBeTruthy();
  });

  test('ProductForm renders without crashing', () => {
    const { container } = render(
      <BrowserRouter>
        <ProductForm />
      </BrowserRouter>
    );
    expect(container).toBeTruthy();
  });

  test('ProductList renders without crashing', () => {
    const { container } = render(
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    );
    expect(container).toBeTruthy();
  });

  test('ProductUpdate renders without crashing', () => {
    const { container } = render(
      <BrowserRouter>
        <ProductUpdate />
      </BrowserRouter>
    );
    expect(container).toBeTruthy();
  });

  test('Pages render without crashing', () => {
    const pages = [<AddProduct />, <Home />, <Products />];
    pages.forEach((page) => {
      const { container } = render(<BrowserRouter>{page}</BrowserRouter>);
      expect(container).toBeTruthy();
    });
  });
});