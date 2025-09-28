import React, { createContext, useState, useEffect } from 'react';

// ✅ MUST have 'export' here
export const AuthContext = createContext();

// ✅ MUST have 'export' here
export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const login = (userData) => {
    setUserInfo(userData);
    localStorage.setItem('userInfo', JSON.stringify(userData));
  };

  const logout = () => {
    setUserInfo(null);
    localStorage.removeItem('userInfo');
  };

  const updateUserInfo = (newUserData) => {
      // Create a new object combining old and new data
      const updatedInfo = { ...userInfo, ...newUserData };
      setUserInfo(updatedInfo);
      localStorage.setItem('userInfo', JSON.stringify(updatedInfo));
    };

  return (
    <AuthContext.Provider value={{ userInfo, login, logout, updateUserInfo  }}>
      {children}
    </AuthContext.Provider>
  );
};