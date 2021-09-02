import React, { useEffect, useReducer } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./Cart";
import { CartContext } from "./cartComtext";
import cartReducer from "./cartReducer";
import Checkout from "./Checkout";
import Detail from "./Detail";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";

let initialCart;
try {
  initialCart = JSON.parse(localStorage.getItem("cart")) ?? [];
} catch {
  console.error("The cart could not be parsed into JSON.");
  initialCart = [];
}

export default function App() {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/:category/:id"
              element={<Detail dispatch={dispatch} />}
            />
            <Route
              path="/checkout"
              element={<Checkout cart={cart} dispatch={dispatch} />}
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </CartContext.Provider>
  );
}
