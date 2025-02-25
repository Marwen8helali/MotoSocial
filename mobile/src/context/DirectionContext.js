import React, { createContext, useState } from 'react';

export const DirectionContext = createContext();

export const DirectionProvider = ({ children }) => {
  const [isRTL, setIsRTL] = useState(false);

  const toggleDirection = (language) => {
    setIsRTL(language === 'ar');
  };

  return (
    <DirectionContext.Provider value={{ isRTL, toggleDirection }}>
      {children}
    </DirectionContext.Provider>
  );
}; 