
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { type InventoryItem } from '@/context/InventoryContext';
import { Separator } from './ui/separator';

interface MultiUnboxResultDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUnboxAgain: () => void;
  onSell: (sellValue: number) => void;
  onKeep: () => void;
  wonItems: InventoryItem[];
}

export function MultiUnboxResultDialog({
  isOpen,
  onClose,
  onUnboxAgain,
  onSell,
  onKeep,
  wonItems,
}: MultiUnboxResultDialogProps) {

  const totalValue = wonItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl bg-card border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-headline text-center">Your Winnings!</DialogTitle>
        </DialogHeader>
        <div className="my-4 max-h-[60vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {wonItems.map((item) => (
                    <Card key={item.id} className="bg-background/50 border border-border group overflow-hidden transition-all duration-300 hover:border-primary/50 flex flex-col items-center justify-start text-center p-2">
                        <div className="relative h-24 w-full mb-2">
                            <Image 
                                src={item.image} 
                                alt={item.name} 
                                fill
                                className="object-contain transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 12.5vw"
                            />
                        </div>
                        <div className="w-full mt-auto">
                            <p className="font-semibold text-xs truncate w-full">{item.name}</p>
                            <p className="text-green-400 font-bold text-xxs">${item.price.toFixed(2)}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
        <Separator className="bg-border" />
        <DialogFooter className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="text-center sm:text-left sm:col-span-1">
            <p className="text-lg font-bold">Total Value:</p>
            <p className="text-2xl font-bold text-green-400">${totalValue.toFixed(2)}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:col-span-2 sm:justify-end">
            <Button variant="outline" className="w-full sm:w-auto" onClick={onUnboxAgain}>Unbox Again</Button>
            <Button variant="secondary" className="w-full sm:w-auto" onClick={() => onSell(totalValue)}>
                Sell all for ${totalValue.toFixed(2)}
            </Button>
            <Button onClick={onKeep} className="w-full sm:w-auto">Keep all</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

    