
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Gift } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function UserProfileStatus() {
  const { profile } = useAuth();
  const username = profile?.username;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-card border-primary/20 md:col-span-1">
        <CardContent className="p-4 flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://i.imgur.com/vH51C2L.png" alt="User" data-ai-hint="user avatar"/>
            <AvatarFallback>{username ? username.charAt(0).toUpperCase() : 'G'}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-bold text-lg font-headline">{username || 'Guest'}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-bold text-primary bg-primary/20 p-1 rounded-md">0</span>
              <Progress value={0} className="w-full h-2 bg-secondary" />
               <span className="text-xs font-bold text-muted-foreground bg-secondary p-1 rounded-md">1</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-card border-primary/20 md:col-span-1">
        <CardContent className="p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
                <Gift className="h-6 w-6 text-primary"/>
                <div>
                    <p className="font-semibold">0 Rewards available</p>
                </div>
            </div>
          <Button variant="outline" size="sm" className="border-primary/50 text-primary-foreground bg-primary/20 hover:bg-primary/40">View my rewards</Button>
        </CardContent>
      </Card>

      <Card className="bg-card border-primary/20 md:col-span-1">
        <CardContent className="p-4 flex items-center justify-between gap-4">
           <div className="flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="currentColor"/>
                </svg>
                <div>
                    <p className="text-sm font-semibold text-muted-foreground">Next Achievement</p>
                    <p className="font-semibold">Deposit $5 or more using ...</p>
                </div>
            </div>
          <Button size="sm">View next achievement</Button>
        </CardContent>
      </Card>
    </div>
  );
}
