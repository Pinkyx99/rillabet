
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';


interface BalanceContextType {
  balance: number;
  addToBalance: (amount: number) => void;
  deductFromBalance: (amount: number) => boolean;
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export const BalanceProvider = ({ children }: { children: ReactNode }) => {
  const { profile, user } = useAuth();
  const [balance, setBalance] = useState<number>(0);
  
  useEffect(() => {
    if (profile) {
      setBalance(profile.balance);
    } else {
      setBalance(0);
    }
  }, [profile]);
  
  const updateBalanceInDb = async (newBalance: number) => {
    if (!user) return;
    const profileRef = doc(db, 'profiles', user.uid);
    try {
      await updateDoc(profileRef, { balance: newBalance });
    } catch (error) {
      console.error('Failed to update balance:', error);
    }
  };

  const addToBalance = (amount: number) => {
    const newBalance = balance + amount;
    setBalance(newBalance);
    updateBalanceInDb(newBalance);
  };

  const deductFromBalance = (amount: number) => {
    if (balance >= amount) {
      const newBalance = balance - amount;
      setBalance(newBalance);
      updateBalanceInDb(newBalance);
      return true;
    }
    return false;
  };

  return (
    <BalanceContext.Provider value={{ balance, addToBalance, deductFromBalance }}>
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
