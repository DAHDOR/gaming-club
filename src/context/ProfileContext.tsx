import { FC, ReactNode, createContext, useEffect, useState } from 'react';
import Profile from '../models/Profile';
import { auth, db } from '../config/Firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface ProfileContextModel {
  profile: Profile | null;
  setProfile: (newProfile: Profile | null) => void;
}

interface ProfileProviderProps {
  children: ReactNode;
}

const DEFAULT = {
  profile: null,
  setProfile: () => {},
};

export const ProfileContext = createContext<ProfileContextModel>(DEFAULT);

export const ProfileProvider: FC<ProfileProviderProps> = ({
  children,
}: ProfileProviderProps) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const profileRef = doc(db, 'profiles', user.uid);
        const profileSnap = await getDoc(profileRef);
        if (profileSnap.exists()) {
          setProfile(profileSnap.data() as Profile);
        } else {
          const email = user.email as string;
          const newProfile = {
            id: user.uid,
            name: user.displayName || email.split('@')[0],
            email: email,
            pfp: user.photoURL || '',
            clubs: [],
          };
          setProfile(newProfile);
          await setDoc(profileRef, newProfile);
        }
      } else {
        setProfile(null);
      }
    });

    return unsubscribe;
  }, [profile, setProfile]);

  return (
    <ProfileContext.Provider
      value={{ profile: profile, setProfile: setProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
