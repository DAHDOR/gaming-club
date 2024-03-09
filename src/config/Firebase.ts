import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA37VVUbRk27DeAZOiK9PCjBZot8C1KacU',

  authDomain: 'gaming-club-b1421.firebaseapp.com',

  projectId: 'gaming-club-b1421',

  storageBucket: 'gaming-club-b1421.appspot.com',

  messagingSenderId: '288896631765',

  appId: '1:288896631765:web:b10bf543979a790b1ff35c',
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app, 'gs://gaming-club-b1421.appspot.com');

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
