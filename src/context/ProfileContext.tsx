import { FC, ReactNode, createContext, useEffect, useState } from 'react';
import Profile, { isProfile } from '../models/Profile';

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
  const [profile, setProfile] = useState<Profile | null>(() => {
    const savedProfile = localStorage.getItem('profile');
    if (savedProfile) {
      const profileObject = JSON.parse(savedProfile);
      if (isProfile(profileObject)) {
        return profileObject;
      } else {
        return null;
      }
    } else {
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem('profile', JSON.stringify(profile));
  }, [profile]);

  return (
    <ProfileContext.Provider
      value={{ profile: profile, setProfile: setProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
