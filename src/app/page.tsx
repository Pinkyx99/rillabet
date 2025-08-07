
'use client';
import { Header } from "@/components/layout/header";
import { UserProfileStatus } from "@/components/user-profile-status";
import { MainBanner } from "@/components/main-banner";
import { GameModes } from "@/components/game-modes";
import { FeaturedBoxes } from "@/components/featured-boxes";
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { BalanceProvider } from '@/context/BalanceContext';

export default function Home() {
  return (
    <BalanceProvider>
      <div className="flex min-h-screen bg-background">
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
              <UserProfileStatus />
              <MainBanner />
              <GameModes />
              <FeaturedBoxes />
            </div>
          </main>
          <Button
            variant="default"
            size="icon"
            className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg"
          >
            <MessageSquare className="h-7 w-7" />
          </Button>
        </div>
      </div>
    </BalanceProvider>
  );
}
