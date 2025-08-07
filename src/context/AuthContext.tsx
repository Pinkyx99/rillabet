
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth, db } from '@/lib/firebase/client';
import { onAuthStateChanged, User, signOut, GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

interface Profile {
  uid: string;
  username: string;
  email: string;
  balance: number;
  createdAt: any; 
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        setUser(firebaseUser);
        const profileRef = doc(db, 'profiles', firebaseUser.uid);
        const profileSnap = await getDoc(profileRef);

        if (profileSnap.exists()) {
          // Profile exists, no need to do anything here as the snapshot listener will pick it up
        } else {
          // This is a new user, they need to create a profile.
          router.push('/welcome');
        }
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (user) {
      const profileRef = doc(db, 'profiles', user.uid);
      const unsubscribe = onSnapshot(profileRef, (doc) => {
        if (doc.exists()) {
          const profileData = doc.data() as Profile;
          if (profileData.createdAt && typeof profileData.createdAt.toDate === 'function') {
            setProfile({ ...profileData, createdAt: profileData.createdAt.toDate().toISOString() });
          } else {
            setProfile(profileData);
          }
        }
      });
      return () => unsubscribe();
    } else {
      setProfile(null);
    }
  }, [user]);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // The onAuthStateChanged listener will handle the rest
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const value = {
    user,
    profile,
    loading,
    logout,
    loginWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
