
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useBalance } from '@/context/BalanceContext';
import { useToast } from '@/hooks/use-toast';
import { BalanceProvider } from '@/context/BalanceContext';
import { Header } from '@/components/layout/header';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { InventoryProvider } from '@/context/InventoryContext';

function PromoCodesContent() {
    const [promoCode, setPromoCode] = useState('');
    const { addToBalance } = useBalance();
    const { toast } = useToast();
    const [usedCodes, setUsedCodes] = useState<string[]>([]);

    const handleRedeem = () => {
        if (promoCode.toLowerCase() === 'free5') {
            if (usedCodes.includes('free5')) {
                toast({
                    title: 'Code Already Redeemed',
                    description: 'You have already used this promo code.',
                    variant: 'destructive',
                });
            } else {
                addToBalance(5);
                setUsedCodes([...usedCodes, 'free5']);
                toast({
                    title: 'Success!',
                    description: '$5.00 has been added to your balance.',
                });
                setPromoCode('');
            }
        } else {
            toast({
                title: 'Invalid Code',
                description: 'The promo code you entered is not valid.',
                variant: 'destructive',
            });
        }
    };
    
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-md">
                     <Link href="/" passHref>
                        <Button variant="ghost" className="mb-4">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Return to Home
                        </Button>
                    </Link>
                    <Card>
                        <CardHeader>
                            <CardTitle>Redeem a Promo Code</CardTitle>
                            <CardDescription>Enter your code below to claim your reward.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex space-x-2">
                                <Input
                                    type="text"
                                    placeholder="Enter code"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                    className="flex-1"
                                />
                                <Button onClick={handleRedeem}>Redeem</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}

export default function PromoCodesPage() {
    return (
        <BalanceProvider>
          <InventoryProvider>
            <PromoCodesContent />
          </InventoryProvider>
        </BalanceProvider>
    );
}
