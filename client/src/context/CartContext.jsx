import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Get initial cart items from localStorage or use an empty array
  const initialState = JSON.parse(localStorage.getItem('cartItems')) || [];
  const [cartItems, setCartItems] = useState(initialState);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // --- CART ACTIONS ---

  const clearCart = () => {
      setCartItems([]);
      localStorage.removeItem('cartItems');
    };

  // Add an item to the cart (or update its quantity)
  const addToCart = (product, qty) => {
    const exist = cartItems.find((x) => x._id === product._id);

    if (exist) {
      // If item already exists, update its quantity
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id ? { ...exist, qty } : x
        )
      );
    } else {
      // If it's a new item, add it to the cart
      setCartItems([...cartItems, { ...product, qty }]);
    }
  };

  // Remove an item from the cart
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((x) => x._id !== productId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
        {children}
      </CartContext.Provider>
  );
};