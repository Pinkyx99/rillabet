
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { BalanceProvider, useBalance } from '@/context/BalanceContext';
import { InventoryProvider, useInventory } from '@/context/InventoryContext';
import { useToast } from '@/hooks/use-toast';
import { Package, Trash2, DollarSign, Calendar, Box, Swords, BarChart, Settings, Repeat, Truck, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from '@/context/AuthContext';


function ItemsContent() {
    const { inventory, removeFromInventory, getInventoryValue } = useInventory();
    const { addToBalance } = useBalance();
    const { toast } = useToast();
    const { user, profile } = useAuth();
    const [joinDate, setJoinDate] = useState('');
    const username = profile?.username;

    useEffect(() => {
        if(profile?.createdAt) {
            setJoinDate(new Date(profile.createdAt).toLocaleDateString());
        }
    }, [profile]);

    const handleSellItem = (item: any) => {
        addToBalance(item.price);
        removeFromInventory(item.id);
        toast({
            title: 'Item Sold!',
            description: `${item.name} sold for $${item.price.toFixed(2)}.`,
        });
    };

    const totalInventoryValue = getInventoryValue();

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Header />
            <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Card className="bg-primary/10 border-primary/20 p-4 mb-8">
                    <CardContent className="flex items-center justify-between p-0">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20 border-2 border-primary">
                                <AvatarImage src="https://i.imgur.com/vH51C2L.png" alt="User" data-ai-hint="user avatar sad" />
                                <AvatarFallback>{username ? username.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h2 className="text-2xl font-bold">{username || 'Guest'}</h2>
                                 <div className="flex items-center gap-2 mt-2">
                                    <span className="text-xs font-bold text-primary bg-primary/20 p-1 rounded-md">0</span>
                                    <Progress value={0} className="w-full h-2 bg-secondary max-w-xs" />
                                    <span className="text-xs font-bold text-muted-foreground bg-secondary p-1 rounded-md">1</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="text-center bg-card p-4 rounded-lg">
                                <p className="text-sm text-muted-foreground flex items-center gap-1"><Calendar className="h-4 w-4" /> Date Joined</p>
                                <p className="text-lg font-bold">{joinDate}</p>
                            </div>
                             <div className="text-center bg-card p-4 rounded-lg">
                                <p className="text-sm text-muted-foreground flex items-center gap-1"><Box className="h-4 w-4" /> Boxes Opened</p>
                                <p className="text-lg font-bold">5</p>
                            </div>
                             <div className="text-center bg-card p-4 rounded-lg">
                                <p className="text-sm text-muted-foreground flex items-center gap-1"><Swords className="h-4 w-4" /> Battles Created</p>
                                <p className="text-lg font-bold">0</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex items-center gap-2 mb-8">
                    <Button variant="ghost" asChild><Link href="/">Boxes</Link></Button>
                    <Button variant="secondary" asChild><Link href="/items">Items</Link></Button>
                    <Button variant="ghost">Shipments</Button>
                    <Button variant="ghost">Withdrawals</Button>
                    <Button variant="ghost">Referrals</Button>
                    <Button variant="ghost">Settings</Button>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-4">
                         <h1 className="text-2xl font-bold">YOUR ITEMS ({inventory.length})</h1>
                         <p className="text-sm text-muted-foreground">Your won items, either withdraw or sell them</p>
                    </div>

                    {inventory.length === 0 ? (
                        <Card className="bg-card/50 border-dashed border-border flex flex-col items-center justify-center py-20 text-center">
                            <CardContent>
                                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                                <h2 className="text-2xl font-semibold">Your inventory is empty.</h2>
                                <p className="text-muted-foreground mt-2">Unbox some items to see them here!</p>
                                <Button asChild className="mt-6">
                                    <Link href="/">Browse Boxes</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                            {inventory.map((item) => (
                                <Card key={item.id} className="bg-card/50 border border-border group overflow-hidden transition-all duration-300 flex flex-col items-center justify-start text-center p-4 relative hover:-translate-y-1 hover:shadow-lg hover:border-primary">
                                    <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">x1</div>
                                    <div className="relative h-32 w-full mb-2">
                                        <Image 
                                            src={item.image} 
                                            alt={item.name} 
                                            fill
                                            className="object-contain transition-transform duration-300 group-hover:scale-110"
                                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 12.5vw"
                                        />
                                    </div>
                                    <p className="font-semibold text-sm truncate w-full mt-2">{item.name}</p>
                                    <div className="w-full mt-4 flex flex-col gap-2">
                                        <Button size="sm" variant="secondary" className="w-full bg-blue-600 hover:bg-blue-700 text-white">${item.price.toFixed(2)}</Button>
                                        <Button size="sm" variant="destructive" className="w-full" onClick={() => handleSellItem(item)}>
                                            SELL
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                 <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-4">INVENTORY LOGS</h2>
                     <Tabs defaultValue="account">
                        <TabsList>
                            <TabsTrigger value="account">Account</TabsTrigger>
                            <TabsTrigger value="boxes">Boxes</TabsTrigger>
                            <TabsTrigger value="battles">Battles</TabsTrigger>
                            <TabsTrigger value="items">Items</TabsTrigger>
                            <TabsTrigger value="crash">Crash</TabsTrigger>
                            <TabsTrigger value="plinko">Plinko</TabsTrigger>
                            <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
                        </TabsList>
                        <TabsContent value="account">
                           <Table>
                                <TableHeader>
                                    <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Action</TableHead>
                                    <TableHead>Value</TableHead>
                                    <TableHead>Details</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center h-24">
                                            No Data has been Found
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    );
}

export default function ItemsPage() {
    return (
        <BalanceProvider>
            <InventoryProvider>
                <ItemsContent />
            </InventoryProvider>
        </BalanceProvider>
    );
}
