import { create } from 'zustand';

export interface UserData {
  email: string;
  usual_full_name: string;
  image: {
    link: string;
  };
  wallet: string;
  correction_point: string;
  campus: {
    country: string;
    city: string;
  }[];
  cursus_users: {
    level: number;
    skills: {
      id: number;
      name: string;
      level: number;
    }[];
  }[];
  projects_users: {
    id: number;
    status: string;
    'validated?': boolean | null;
    final_mark: number;
    project: {
      id: number;
      name: string;
    };
  }[];
}

interface UserStore {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
