import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const userId = localStorage.getItem("userId");

  // CHECK LOGIN
  const ensureLogin = () => {
    if (!userId) {
      alert("Please login first!");
      window.location.href = "/login";
      return false;
    }
    return true;
  };

  // LOAD CART
  const fetchCart = () => {
    if (!ensureLogin()) return;

    fetch(`http://localhost:5000/api/cart/${userId}`)
      .then((res) => res.json())
      .then((data) => setCart(data))
      .catch((err) => console.log("Cart fetch error:", err));
  };

  useEffect(() => {
    if (userId) fetchCart();
  }, [userId]);

  // ADD
  const addToCart = async (product) => {
    if (!ensureLogin()) return;

    const res = await fetch("http://localhost:5000/api/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, product }),
    });

    const updated = await res.json();
    setCart(updated);
  };

  // REMOVE
  const removeFromCart = async (productId) => {
    if (!ensureLogin()) return;

    const res = await fetch("http://localhost:5000/api/cart/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId }),
    });

    const updated = await res.json();
    setCart(updated);
  };

  // INCREASE
  const increaseQuantity = async (productId) => {
    if (!ensureLogin()) return;

    const res = await fetch("http://localhost:5000/api/cart/increase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId }),
    });

    const updated = await res.json();
    setCart(updated);
  };

  // DECREASE
  const decreaseQuantity = async (productId) => {
    if (!ensureLogin()) return;

    const res = await fetch("http://localhost:5000/api/cart/decrease", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId }),
    });

    const updated = await res.json();
    setCart(updated);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
