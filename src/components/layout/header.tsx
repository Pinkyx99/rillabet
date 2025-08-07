
'use client';

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  ChevronDown,
  Gift,
  Home,
  Menu,
  Ticket,
  LogOut,
  Settings,
  DollarSign,
  Package
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useBalance } from '@/context/BalanceContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export function Header() {
  const { balance } = useBalance();
  const { profile, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
    router.refresh();
  };

  const username = profile?.username;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-headline text-3xl font-bold text-primary">
              PINKYBOX
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-2 text-sm font-medium">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <Home className="h-5 w-5" />
              </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <Button variant="ghost">
                    Games <ChevronDown className="h-4 w-4" />
                  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild><Link href="/boxes">Mystery Boxes</Link></DropdownMenuItem>
                <DropdownMenuItem>Battles</DropdownMenuItem>
                <DropdownMenuItem>Crash</DropdownMenuItem>
                <DropdownMenuItem>Plinko</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <Gift className="h-5 w-5 mr-2" />
                  Rewards <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Achievements</DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/promocodes">Promo Codes</Link></DropdownMenuItem>
                <DropdownMenuItem>Redeem</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" className="bg-yellow-400/10 border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/20 hover:text-yellow-300">
              <Ticket className="h-5 w-5" /> $10K Race
            </Button>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-glow-primary transition-all hover:scale-105">
              Deposit
            </Button>
             <div className="relative">
              <Button variant="ghost" size="icon"><Gift className="h-5 w-5" /></Button>
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 justify-center">0</Badge>
            </div>
             <div className="relative">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-muted-foreground">
                    <path d="M17 17H17.01M16.235 7.428C16.83 6.954 17.153 6.22 17.153 5.44C17.153 3.984 15.968 2.8 14.513 2.8C13.058 2.8 11.873 3.984 11.873 5.44C11.873 6.903 12.98 8.032 14.417 8.143C14.59 8.156 14.762 8.176 14.932 8.203L15.42 9.062L13.792 10.962C12.338 12.02 11.233 13.522 10.636 15.244L10.373 16.1H13.153L13.411 15.253C13.733 14.239 14.364 13.354 15.213 12.72L16.242 11.89L17 13.053V13.153C17 14.249 16.634 15.29 15.992 16.142C15.823 16.362 15.666 16.573 15.524 16.772C15.228 17.185 15.153 17.712 15.153 18.2V21.2H17.153V18.2C17.153 18.188 17.153 18.175 17.153 18.163C17.153 18.156 17.154 18.15 17.155 18.143C17.518 16.435 18.777 15.013 20.373 14.486L21.153 14.2V7.2L20.373 6.914C18.777 6.387 17.518 4.965 17.155 3.257C17.154 3.25 17.153 3.244 17.153 3.237V3.2H15.153V3.237C15.153 3.688 15.228 4.215 15.524 4.628C15.666 4.827 15.823 5.038 15.992 5.258C16.121 5.43 16.235 5.592 16.333 5.743L16.235 7.428ZM6.847 21.2V16.1L6.589 15.253C5.595 13.065 5.595 10.535 6.589 8.347L6.847 7.5H9.627L9.364 8.347C8.619 10.155 8.619 12.245 9.364 14.053L9.627 14.9H6.847V14.2L6.067 14.486C4.471 15.013 3.212 16.435 2.849 18.143C2.848 18.15 2.847 18.156 2.847 18.163C2.847 18.175 2.847 18.188 2.847 18.2V21.2H4.847V18.2C4.847 17.712 4.772 17.185 4.476 16.772C4.334 16.573 4.177 16.362 4.008 16.142C3.366 15.29 3 14.249 3 13.153V13.053L3.758 11.89L4.787 12.72C5.636 13.354 6.267 14.239 6.589 15.253L6.847 16.1H9.627L9.364 15.253C8.767 13.522 7.662 12.02 6.208 10.962L4.58 9.062L5.068 8.203C5.238 8.176 5.41 8.156 5.583 8.143C7.02 8.032 8.127 6.903 8.127 5.44C8.127 3.984 6.942 2.8 5.487 2.8C4.032 2.8 2.847 3.984 2.847 5.44C2.847 6.22 3.17 6.954 3.765 7.428L3.667 5.743C3.765 5.592 3.879 5.43 4.008 5.258C4.177 5.038 4.334 4.827 4.476 4.628C4.772 4.215 4.847 3.688 4.847 3.237V3.2H2.847V3.237C2.847 3.244 2.848 3.25 2.849 3.257C3.212 4.965 4.471 6.387 6.067 6.914L6.847 7.2V14.2L6.067 14.486C4.471 15.013 3.212 16.435 2.849 18.143C2.848 18.15 2.847 18.156 2.847 18.163V21.2H6.847Z" fill="currentColor"/>
                </svg>
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 justify-center">0</Badge>
            </div>
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="https://i.imgur.com/vH51C2L.png" alt="User" data-ai-hint="user avatar" />
                    <AvatarFallback>{username ? username.charAt(0).toUpperCase() : 'G'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold">{username || 'Guest'}</p>
                    <p className="text-xs font-bold text-green-400">${balance.toFixed(2)}</p>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/items">
                    <Package className="mr-2 h-4 w-4" />
                    <span>Items</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <DollarSign className="mr-2 h-4 w-4" />
                  <span>Balance: ${balance.toFixed(2)}</span>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/promocodes">
                    <Ticket className="mr-2 h-4 w-4" />
                    <span>Promo Codes</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72 bg-sidebar border-r-0">
                 {/* Mobile nav content can be added here */}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
