import React, { createContext, useState, useContext } from "react";

// Create a Context
const UserContext = createContext();

// Create a Provider Component
export const UserProvider = ({ children }) => {
  const [idCard, setIdCard] = useState("");

  return (
    <UserContext.Provider value={{ idCard, setIdCard }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook for easy context usage
export const useUser = () => useContext(UserContext);
