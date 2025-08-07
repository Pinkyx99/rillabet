
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { Chrome } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { loginWithGoogle, user, loading, profile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user && profile) {
      router.push('/');
    }
  }, [user, profile, loading, router]);

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      // The AuthProvider will handle routing
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  if (loading || user) {
    return <div className="flex min-h-screen items-center justify-center bg-background">Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-8 left-8 text-3xl font-bold text-primary">RILLALOOT</div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Welcome to RillaLoot</CardTitle>
          <CardDescription>Sign in to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleGoogleLogin} className="w-full">
            <Chrome className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
