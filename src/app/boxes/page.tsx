
'use client';
import { Header } from "@/components/layout/header";
import { BalanceProvider } from '@/context/BalanceContext';
import { InventoryProvider } from '@/context/InventoryContext';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

function BoxesContent() {
    return (
        <div className="flex min-h-screen bg-background">
          <div className="flex flex-1 flex-col">
            <Header />
            <main className="flex-1 overflow-y-auto">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <h1 className="text-3xl font-bold">Browse Boxes</h1>
                    <div className="relative w-full md:w-auto">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="Search boxes..." className="pl-10 w-full md:w-64 lg:w-80" />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="secondary">All</Button>
                    <Button variant="ghost">New</Button>
                    <Button variant="ghost">Popular</Button>
                    <Button variant="ghost">Price (Low to High)</Button>
                    <Button variant="ghost">Price (High to Low)</Button>
                </div>

                <div className="flex items-center justify-center text-center py-20 bg-card rounded-lg">
                    <p className="text-muted-foreground">More boxes coming soon!</p>
                </div>

              </div>
            </main>
          </div>
        </div>
    )
}


export default function BoxesPage() {
  return (
    <BalanceProvider>
      <InventoryProvider>
        <BoxesContent />
      </InventoryProvider>
    </BalanceProvider>
  );
}
