import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./Cart";
import Detail from "./Detail";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
export default function App() {
  const [cart, setCart] = useState([]);
  const [count, setcount] = useState(1);
  function addToCart(id, sku) {
    setCart((items) => {
      const itemInCart = items.find((i) => i.sku === sku);
      if (itemInCart) {
        //return new array with the matching item replaced
        return items.map((i) =>
          i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // return a new awway with the new item appended
        return [...items, { id, sku, quantity: 1 }];
      }
    });
  }
  function updateQuantity(sku, quantity) {
    console.log(sku, quantity);
    //   setcount(quantity);

    setCart((items) => {
      return quantity === 0
        ? items.filter((i) => i.sku !== sku)
        : items.map((i) => (i.sku === sku ? { ...i, quantity } : i));
      // if (quantity === 0) {
      //   return items.filter((i) => i.sku !== sku);
      // }
      // return items.map((i) => (i.sku === sku ? { ...i, quantity } : i));
    });
  }
  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route
              path="/cart"
              element={<Cart cart={cart} updateQuantity={updateQuantity} />}
            />
            <Route
              path="/:category/:id"
              element={<Detail addToCart={addToCart} />}
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
