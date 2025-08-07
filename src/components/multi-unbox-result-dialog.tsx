
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { type DropItem } from './unboxing-experience';
import { Separator } from './ui/separator';

interface MultiUnboxResultDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUnboxAgain: () => void;
  onSell: (sellValue: number) => void;
  wonItems: DropItem[];
}

export function MultiUnboxResultDialog({
  isOpen,
  onClose,
  onUnboxAgain,
  onSell,
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
                {wonItems.map((item, index) => (
                    <Card key={`${item.name}-${index}`} className="bg-background/50 border border-border group overflow-hidden transition-all duration-300 hover:border-primary/50 flex flex-col items-center justify-start text-center p-2">
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
        <DialogFooter className="sm:justify-between items-center mt-4">
          <div className="text-center sm:text-left">
            <p className="text-lg font-bold">Total Value:</p>
            <p className="text-2xl font-bold text-green-400">${totalValue.toFixed(2)}</p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Button variant="outline" onClick={() => onSell(totalValue)}>
                Sell all for ${totalValue.toFixed(2)}
            </Button>
            <Button onClick={onUnboxAgain}>Unbox Again</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
