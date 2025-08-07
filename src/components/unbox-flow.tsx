
'use client';

import { useState, useEffect, useRef, createRef } from 'react';
import Image from 'next/image';
import { type DropItem } from './unboxing-experience';
import { cn } from '@/lib/utils';
import React from 'react';

interface UnboxFlowProps {
  items: DropItem[];
  wonItems: (DropItem | null)[];
}

interface CarouselInstance {
  id: number;
  wonItem: DropItem;
  items: DropItem[];
  ref: React.RefObject<HTMLDivElement>;
  isSpinning: boolean;
}

export function UnboxFlow({ items, wonItems }: UnboxFlowProps) {
  const [carousels, setCarousels] = useState<CarouselInstance[]>([]);
  const parentRefs = useRef<(React.RefObject<HTMLDivElement> | null)[]>([]);

  // Create parent container refs
  if (parentRefs.current.length !== wonItems.length) {
    parentRefs.current = wonItems.map(() => createRef<HTMLDivElement>());
  }

  useEffect(() => {
    if (wonItems.length > 0) {
      // Initialize carousels state
      const initialCarousels = wonItems.map((wonItem, i) => {
        if (!wonItem) return null;
        return {
          id: Math.random(),
          wonItem,
          items: [...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items].sort(() => Math.random() - 0.5),
          ref: createRef<HTMLDivElement>(),
          isSpinning: true,
        };
      }).filter((c): c is CarouselInstance => c !== null);

      setCarousels(initialCarousels);

      // Start animations after a short delay
      setTimeout(() => {
        setCarousels(prevCarousels => {
          return prevCarousels.map((carousel, i) => {
            const carouselRef = carousel.ref;
            const parentRef = parentRefs.current[i];

            if (carousel.wonItem && carouselRef.current && parentRef?.current) {
                const targetIndex = carousel.items.findIndex((item, idx) => idx > carousel.items.length / 3 && item.name === carousel.wonItem.name);
                
                if (targetIndex !== -1) {
                    const itemWidthWithMargin = 192 + 16;
                    const containerWidth = parentRef.current.offsetWidth || 0;
                    const targetPosition = (targetIndex * itemWidthWithMargin) - (containerWidth / 2) + (itemWidthWithMargin / 2);
    
                    carouselRef.current.style.transition = 'transform 7s cubic-bezier(0.25, 0.1, 0.25, 1)';
                    carouselRef.current.style.transform = `translateX(-${targetPosition}px)`;
                }
            }
            return carousel;
          });
        });
      }, 100);

      // End spinning animation
      setTimeout(() => {
        setCarousels(prevCarousels => prevCarousels.map(c => ({...c, isSpinning: false})));
      }, 7100);
    }
  }, [wonItems, items]);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      {carousels.map((carousel, index) => (
        <div key={carousel.id} ref={parentRefs.current[index]} className="w-full max-w-7xl mx-auto overflow-hidden relative h-64">
          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-1 h-full bg-primary z-20 rounded-full shadow-glow-primary" />
          <div className="absolute inset-y-0 left-0 w-1/4 z-10 bg-gradient-to-r from-background to-transparent" />
          <div className="absolute inset-y-0 right-0 w-1/4 z-10 bg-gradient-to-l from-background to-transparent" />
          <div 
            ref={carousel.ref}
            className="flex items-center h-full"
          >
             {carousel.items.map((item, itemIndex) => (
                <div
                key={`${item.name}-${itemIndex}`}
                className={cn(
                    "flex-shrink-0 w-48 h-56 flex flex-col items-center justify-center rounded-lg mx-2 transition-all duration-500",
                    !carousel.isSpinning && carousel.wonItem?.name !== item.name && "opacity-30 scale-90",
                    !carousel.isSpinning && carousel.wonItem?.name === item.name && "scale-110"
                )}
                >
                <div className={cn(
                    "flex-shrink-0 w-48 h-56 flex flex-col items-center justify-center rounded-lg transition-all duration-300 relative group p-4",
                    !carousel.isSpinning && carousel.wonItem?.name === item.name && "border-2 border-primary shadow-glow-primary"
                )}>
                    <div className="relative h-24 w-full">
                    <Image src={item.image} alt={item.name} fill className="object-contain" />
                    </div>
                    <p className="text-xs font-bold mt-2 text-center px-2 truncate w-full">{item.name}</p>
                    <p className="text-green-400 font-bold text-xxs">${item.price.toFixed(2)}</p>
                    <p className="text-xxs text-muted-foreground">{item.percentage}</p>
                </div>
                </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
