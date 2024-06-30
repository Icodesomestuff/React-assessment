import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductListing from './Components/productView';
// import ResetPassword from './pages/ResetPassword';
import SignupForm from './Components/SignupForm'
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignupForm />} /> 
      <Route path="/products" element={<ProductListing />} />
      {/* <Route path="/reset-password" element={<ResetPassword />} /> */} 
    </Routes>
  );
};

export default App;