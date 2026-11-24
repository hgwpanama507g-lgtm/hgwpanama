import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Suppress harmless Firestore idle stream connection warnings in console
if (typeof window !== 'undefined') {
  const originalWarn = console.warn;
  console.warn = (...args: any[]) => {
    const msg = args.join(' ');
    if (msg.includes('Disconnecting idle stream') || msg.includes('GrpcConnection RPC')) {
      return;
    }
    originalWarn(...args);
  };
  const originalError = console.error;
  console.error = (...args: any[]) => {
    const msg = args.join(' ');
    if (msg.includes('Disconnecting idle stream') || msg.includes('GrpcConnection RPC')) {
      return;
    }
    originalError(...args);
  };
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, (firebaseConfig as any).firestoreDatabaseId);
export const auth = getAuth(app);
