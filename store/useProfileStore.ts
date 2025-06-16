import { Profile } from '@/types/Profile';
import { create } from 'zustand';

interface ProfileState {
  profile: Profile | undefined;
  setProfile: (profile: Profile) => void;
}

export const useProfileStore = create<ProfileState>(set => ({
  profile: undefined,
  setProfile: profile => set({ profile }),
}));
