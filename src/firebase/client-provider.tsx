'use client';

import React, { useState, type ReactNode } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { initializeFirebase, getSdks } from '@/firebase';
import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

type FirebaseServices = {
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
};

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  // Initialize Firebase on the client side, but ensure it only runs once.
  const [firebaseServices, setFirebaseServices] = useState<FirebaseServices | null>(null);

  React.useEffect(() => {
    // This effect runs only once on the client after the component mounts.
    if (!firebaseServices) {
      setFirebaseServices(initializeFirebase());
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  if (!firebaseServices) {
    // You can render a loading spinner here or just null
    return null;
  }

  return (
    <FirebaseProvider
      firebaseApp={firebaseServices.firebaseApp}
      auth={firebaseServices.auth}
      firestore={firebaseServices.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
