import React, { createContext, useState, useEffect } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const initialState = JSON.parse(localStorage.getItem('wishlistItems')) || [];
  const [wishlistItems, setWishlistItems] = useState(initialState);

  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Add an item to the wishlist
  const addToWishlist = (product) => {
    // Prevent adding duplicates
    if (!wishlistItems.find((item) => item._id === product._id)) {
      setWishlistItems([...wishlistItems, product]);
      alert(`${product.name} added to wishlist!`);
    } else {
      alert(`${product.name} is already in your wishlist.`);
    }
  };

  // Remove an item from the wishlist
  const removeFromWishlist = (productId) => {
    setWishlistItems(wishlistItems.filter((item) => item._id !== productId));
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};