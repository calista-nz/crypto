import React, { createContext, useState } from 'react';

export const CoinContext = createContext();

const CoinContextProvider = ({ children }) => {

  const [currency, setCurrency] = useState({
    name: 'usd',
    symbol: '$'
  });

  return (
    <CoinContext.Provider
      value={{
        currency,
        setCurrency
      }}
    >
      {children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;