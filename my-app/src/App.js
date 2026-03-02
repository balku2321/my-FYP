import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Correct import for Routes
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import FarmerDetail from './components/FarmerDetail';
import Farmers from './components/Farmers';
import Blog from './components/Blog';
import ContactUs from './components/ContactUs';
import Profile from './components/Profile';
import ShoppingCart from './components/ShoppingCart';
import Checkout from './components/Checkout';
import ProposeExchange from './components/ProposeExchange';
import ExchangeOffers from './components/ExchangeOffers';
import ExchangeStatus from './components/ExchangeStatus';
import PostProduct from './components/PostProduct';
import AdminPanel from './components/AdminPanel';
import ManageProducts from './components/ManageProducts';
import ManageFarmers from './components/ManageFarmers';
import ManageOrders from './components/ManageOrders';
import AdminBlog from './components/AdminBlog';
import PostBlog from './components/PostBlog';
import BlogDetail from './components/BlogDetails';
import Auth from './components/Auth';
import { CartProvider } from './components/CartContext';
import { ProductProvider } from './components/ProductContext'; // Import ProductProvider here
import { FarmerProvider } from './components/FarmerContext';
import { UserProvider } from './components/UserContext'; // Import UserProvider
import CreateFarmerProfile from './components/CreateFarmerProfile';
import OrderConfirmation from './components/OrderConfirmation';
import FarmerDashboard from './components/FarmerDashboard';
import FeaturedProducts from './components/FeaturedProducts';
import Dashboard from './components/Dashboard';

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('/Blog.json')
      .then((response) => response.json())
      .then((data) => {
        setArticles(data);
      })
      .catch((error) => console.error('Error fetching articles:', error));
  }, []);

  const addArticle = (newArticle) => {
    setArticles((prevArticles) => [...prevArticles, newArticle]);
  };

  return (
    <CartProvider>
      <ProductProvider> {/* Wrap the component tree with ProductProvider */}
        <UserProvider>
          <FarmerProvider>
            <Router>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} /> {/* Correct the route */}
                <Route path="/farmers/:id" element={<FarmerDetail />} />
                <Route path="/blog" element={<Blog articles={articles} />} />
                <Route path="/blog/:id" element={<BlogDetail articles={articles} />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/" element={<FeaturedProducts />} />
               
                <Route path="/cart" element={<ShoppingCart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/propose-exchange" element={<ProposeExchange />} />
                <Route path="/exchange-offers" element={<ExchangeOffers />} />
                <Route path="/exchange-status" element={<ExchangeStatus />} />
                <Route path="/post-product" element={<PostProduct />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/admin/manage-products" element={<ManageProducts />} />
                <Route path="/admin/manage-farmers" element={<ManageFarmers />} />
                <Route path="/admin/manage-orders" element={<ManageOrders />} />
                <Route path="/admin/manage-blogs" element={<AdminBlog articles={articles} setArticles={setArticles} />} />
                <Route path="/post-blog" element={<PostBlog addArticle={addArticle} />} />
                <Route path="/Auth-comp" element={<Auth />} />
                <Route path="/farmers" element={<Farmers />} />
                <Route path="/create-farmer-profile" element={<CreateFarmerProfile />} />
                <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
                <Route path="/admin/dashboard" element={<Dashboard />} />
              </Routes>
              <Footer />
            </Router>
          </FarmerProvider>
        </UserProvider>
      </ProductProvider>
    </CartProvider>
  );
}

export default App;
