import React, {createContext, useContext, useState} from 'react';

// Create a Context for the doctor's information
const DoctorContext = createContext();

// Create a Provider Component
export const DoctorProvider = ({children}) => {
  const [doctorId, setDoctorId] = useState('');

  return (
    <DoctorContext.Provider value={{doctorId, setDoctorId}}>
      {children}
    </DoctorContext.Provider>
  );
};

// Create a custom hook for easy context usage
export const useDoctor = () => useContext(DoctorContext);
