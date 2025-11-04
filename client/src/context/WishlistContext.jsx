import React, { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast'; // 1. Import toast

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const initialState = JSON.parse(localStorage.getItem('wishlistItems')) || [];
  const [wishlistItems, setWishlistItems] = useState(initialState);

  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // 2. Update the addToWishlist function to use toast
  const addToWishlist = (product) => {
    // Prevent adding duplicates
    if (!wishlistItems.find((item) => item._id === product._id)) {
      setWishlistItems([...wishlistItems, product]);
      toast.success(`${product.name} added to wishlist!`);
    } else {
      toast.error(`${product.name} is already in your wishlist.`);
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