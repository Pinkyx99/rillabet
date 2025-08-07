
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { type DropItem } from '@/components/unboxing-experience';

export interface InventoryItem extends DropItem {
  id: string; 
}

interface InventoryContextType {
  inventory: InventoryItem[];
  addToInventory: (items: InventoryItem | InventoryItem[]) => void;
  removeFromInventory: (itemId: string) => void;
  getInventoryValue: () => number;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider = ({ children }: { children: ReactNode }) => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
        const savedInventory = localStorage.getItem('userInventory');
        if (savedInventory) {
            setInventory(JSON.parse(savedInventory));
        }
    } catch (error) {
        console.error("Failed to parse inventory from localStorage", error);
        setInventory([]);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('userInventory', JSON.stringify(inventory));
    }
  }, [inventory, isHydrated]);

  const addToInventory = (items: InventoryItem | InventoryItem[]) => {
    const itemsToAdd = Array.isArray(items) ? items : [items];
    setInventory(prevInventory => [...prevInventory, ...itemsToAdd]);
  };

  const removeFromInventory = (itemId: string) => {
    setInventory(prevInventory => prevInventory.filter(item => item.id !== itemId));
  };

  const getInventoryValue = () => {
    return inventory.reduce((total, item) => total + item.price, 0);
  };

  if (!isHydrated) {
    return (
        <InventoryContext.Provider value={{ inventory: [], addToInventory, removeFromInventory, getInventoryValue }}>
            {children}
        </InventoryContext.Provider>
    );
  }

  return (
    <InventoryContext.Provider value={{ inventory, addToInventory, removeFromInventory, getInventoryValue }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};

    