import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./Cart";
import { useCart } from "./cartComtext";
import Checkout from "./Checkout.class";
import Detail from "./Detail.class";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";

export default function App() {
  const { dispatch } = useCart();
  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/:category/:id" element={<Detail />} />
            <Route
              path="/checkout"
              element={<Checkout dispatch={dispatch} />}
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
