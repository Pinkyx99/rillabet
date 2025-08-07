
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface BalanceContextType {
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  addToBalance: (amount: number) => void;
  deductFromBalance: (amount: number) => boolean;
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export const BalanceProvider = ({ children }: { children: ReactNode }) => {
  const [balance, setBalance] = useState<number>(0);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const savedBalance = localStorage.getItem('userBalance');
    if (savedBalance) {
      setBalance(parseFloat(savedBalance));
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('userBalance', balance.toString());
    }
  }, [balance, isHydrated]);

  const addToBalance = (amount: number) => {
    setBalance(prevBalance => prevBalance + amount);
  };

  const deductFromBalance = (amount: number) => {
    if (balance >= amount) {
      setBalance(prevBalance => prevBalance - amount);
      return true;
    }
    return false;
  };
  
  if (!isHydrated) {
    return (
        <BalanceContext.Provider value={{ balance: 0, setBalance, addToBalance, deductFromBalance }}>
            {children}
        </BalanceContext.Provider>
    );
  }

  return (
    <BalanceContext.Provider value={{ balance, setBalance, addToBalance, deductFromBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = () => {
  const context = useContext(BalanceContext);
  if (context === undefined) {
    throw new Error('useBalance must be used within a BalanceProvider');
  }
  return context;
};
