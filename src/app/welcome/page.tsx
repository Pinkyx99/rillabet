
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase/client';
import { doc, getDoc, setDoc, serverTimestamp, query, collection, where, getDocs } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function WelcomePage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // If the user is logged in and already has a profile, they shouldn't be here.
    if (!loading && user && profile?.username && profile.username !== 'Guest') {
      router.push('/');
    }
     // If the user is not logged in, send them to the login page.
    if (!loading && !user) {
        router.push('/login');
    }
  }, [user, profile, loading, router]);
  
  const handleCreateProfile = async () => {
    if (!user) {
        toast({ title: 'You must be logged in.', variant: 'destructive' });
        return;
    }
    if (username.length < 3) {
        setError('Username must be at least 3 characters long.');
        return;
    }
    setError('');
    setIsSubmitting(true);

    try {
        // 1. Check if username is already taken
        const usernameQuery = query(collection(db, 'profiles'), where('username', '==', username));
        const querySnapshot = await getDocs(usernameQuery);
        if (!querySnapshot.empty) {
            setError('This username is already taken. Please choose another.');
            setIsSubmitting(false);
            return;
        }

        // 2. Create the user profile
        const profileRef = doc(db, 'profiles', user.uid);
        await setDoc(profileRef, {
            uid: user.uid,
            username: username,
            email: user.email,
            balance: 5.00,
            createdAt: serverTimestamp(),
        });

        toast({ title: 'Profile created!', description: 'Welcome to RillaLoot!' });
        router.push('/');

    } catch (err) {
        console.error(err);
        setError('Failed to create profile. Please try again.');
        setIsSubmitting(false);
    }
  };

  if (loading || (user && profile?.username && profile.username !== 'Guest')) {
    return <div className="flex min-h-screen items-center justify-center bg-background">Loading...</div>;
  }
  
  if (!user) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-8 left-8 text-3xl font-bold text-primary">RILLALOOT</div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Welcome!</CardTitle>
          <CardDescription>Please choose a username to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isSubmitting}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button onClick={handleCreateProfile} disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Saving...' : 'Save and Continue'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
