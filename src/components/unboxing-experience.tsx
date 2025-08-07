
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';
import { useState } from 'react';
import { ShieldCheck, ArrowLeft, Plus, Minus } from 'lucide-react';
import { UnboxFlow } from './unbox-flow';
import { Card, CardContent } from './ui/card';
import { Separator } from './ui/separator';
import Link from 'next/link';
import { MultiUnboxResultDialog } from './multi-unbox-result-dialog';
import { useBalance } from '@/context/BalanceContext';
import { useToast } from '@/hooks/use-toast';
import { BalanceProvider } from '@/context/BalanceContext';
import { InventoryProvider, useInventory, type InventoryItem } from '@/context/InventoryContext';

export interface DropItem {
    name: string;
    image: string;
    aiHint: string;
    price: number;
    percentage: string;
}

interface UnboxingExperienceProps {
  boxName: string;
  boxImage: string;
  dropItems: DropItem[];
  boxPrice: number;
}

function UnboxingExperienceContent({ boxName, boxImage, dropItems, boxPrice }: UnboxingExperienceProps) {
  const [view, setView] = useState<'showcase' | 'unboxing'>('showcase');
  const [wonItems, setWonItems] = useState<InventoryItem[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [unboxingKey, setUnboxingKey] = useState(0);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const { balance, deductFromBalance, addToBalance } = useBalance();
  const { addToInventory } = useInventory();
  const { toast } = useToast();
  
  const getWeightedRandomItem = (): DropItem => {
    let i;
    const weights: number[] = dropItems.map(item => parseFloat(item.percentage));

    for (i = 1; i < weights.length; i++) {
      weights[i] += weights[i - 1];
    }
    
    const random = Math.random() * weights[weights.length - 1];
    
    for (i = 0; i < weights.length; i++) {
      if (weights[i] > random) {
        break;
      }
    }
    return dropItems[i];
  }

  const startUnboxing = () => {
    const totalCost = boxPrice * quantity;
    if (!deductFromBalance(totalCost)) {
      toast({
        title: "Insufficient Funds",
        description: `You need $${totalCost.toFixed(2)} to unbox, but you only have $${balance.toFixed(2)}.`,
        variant: "destructive",
      });
      return;
    }

    setWonItems([]); 
    setView('unboxing'); 
    setUnboxingKey(prevKey => prevKey + 1); 
    
    setTimeout(() => {
      const newWonItems = Array.from({ length: quantity }, () => {
        const item = getWeightedRandomItem();
        return { ...item, id: self.crypto.randomUUID() };
      });
      setWonItems(newWonItems);
      
      setTimeout(() => {
        setIsResultOpen(true);
      }, 8000); 
    }, 100); 
  };
  
  const handleUnboxAgain = () => {
    setIsResultOpen(false);
    setTimeout(() => {
        startUnboxing();
    }, 100);
  }

  const handleReturnToShowcase = () => {
      setView('showcase');
      setWonItems([]);
  }

  const handleSellItems = (sellValue: number) => {
    addToBalance(sellValue);
    toast({
        title: "Items Sold!",
        description: `$${sellValue.toFixed(2)} has been added to your balance.`,
    });
    setIsResultOpen(false);
    setView('showcase');
  }

  const handleKeepItems = () => {
    addToInventory(wonItems);
    toast({
        title: "Items Added!",
        description: `${wonItems.length} item(s) have been added to your inventory.`,
    });
    setIsResultOpen(false);
    setView('showcase');
  }

  const handleCloseResults = () => {
    setIsResultOpen(false);
    setView('showcase');
  }

  const totalCost = boxPrice * quantity;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Header />
        <MultiUnboxResultDialog
            isOpen={isResultOpen}
            onClose={handleCloseResults}
            onUnboxAgain={handleUnboxAgain}
            onSell={handleSellItems}
            onKeep={handleKeepItems}
            wonItems={wonItems}
        />
        <main className="flex-1 flex flex-col items-center justify-center p-4">
            {view === 'unboxing' ? (
                <div className="w-full flex flex-col items-center justify-center">
                    <Button variant="ghost" onClick={handleReturnToShowcase} className="self-start mb-4">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Return to Box
                    </Button>
                    <UnboxFlow key={unboxingKey} items={dropItems} wonItems={wonItems} />
                </div>
            ) : (
                <div className="w-full max-w-7xl mx-auto animate-in fade-in duration-500">
                     <Link href="/" passHref>
                        <Button variant="ghost" className="mb-4">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Return to Boxes
                        </Button>
                    </Link>
                    <Card className="bg-primary/10 border-primary/20 overflow-hidden">
                        <CardContent className="flex flex-col md:flex-row items-center p-8 gap-8">
                            <Image src={boxImage} alt={`${boxName} box`} width={200} height={200} className="object-contain" />
                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-4xl font-bold font-headline">{boxName}</h1>
                                <p className="text-muted-foreground mt-2 max-w-lg">
                                    Welcome to the {boxName} Mystery Box, your ticket to chaotic treasure at a bargain price. It's cheap, cheerful, and full of quirky surprises, hidden gems, and random goodness you didn't know you needed. Perfect for risk-takers and collectors. Grab yours now and see what kind of madness you unbox!
                                </p>
                                <Separator className="my-4 bg-primary/20" />
                                <div className="flex items-center justify-center md:justify-start gap-4">
                                     <div className="flex items-center gap-2">
                                        <p className="text-2xl font-bold text-primary">${totalCost.toFixed(2)}</p>
                                     </div>
                                     <div className="flex items-center gap-2 border border-border rounded-md p-1">
                                         <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus className="h-4 w-4"/></Button>
                                         <span className="font-bold w-6 text-center">{quantity}</span>
                                         <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setQuantity(q => Math.min(4, q + 1))}><Plus className="h-4 w-4"/></Button>
                                     </div>
                                     <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg" onClick={startUnboxing}>
                                        BUY {quantity} BOX{quantity > 1 ? 'ES' : ''}
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2 flex items-center justify-center md:justify-start gap-1">
                                    <ShieldCheck className="h-3 w-3 text-green-500" /> 100% Authentic & Secured by Provable Fairness
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="mt-12">
                      <h2 className="text-2xl font-bold mb-1">Drops in {boxName} ({dropItems.length})</h2>
                      <p className="text-muted-foreground mb-6">Unbox to ship or exchange one of the products:</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
                        {dropItems.map((item, index) => (
                           <Card key={index} className="bg-card/50 border border-border group overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-glow-primary/50 flex flex-col items-center justify-start text-center p-2">
                                <div className="relative h-36 w-full mb-2">
                                    <Image 
                                        src={item.image} 
                                        alt={item.name} 
                                        fill
                                        className="object-contain transition-transform duration-300 group-hover:scale-110"
                                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 12.5vw"
                                    />
                                </div>
                                <div className="w-full mt-auto">
                                  <p className="font-semibold text-xs truncate w-full">{item.name}</p>
                                  <div className="bg-primary/80 text-white font-bold rounded-md px-2 py-1 mt-2 text-xs shadow-md w-full">
                                    ${item.price.toFixed(2)}
                                  </div>
                                  <p className="text-xxs text-muted-foreground mt-1">{item.percentage}</p>
                                </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                </div>
            )}
        </main>
    </div>
  );
}


export function UnboxingExperience(props: UnboxingExperienceProps) {
    return (
        <BalanceProvider>
          <InventoryProvider>
            <UnboxingExperienceContent {...props} />
          </InventoryProvider>
        </BalanceProvider>
    )
}
