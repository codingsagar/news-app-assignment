import { User } from "firebase/auth";
import { create } from "zustand";

type Store = {
  user: null | User;
  isAuthenticated: boolean;
  setUser: (user: User|undefined) => void;
};

const useAuthStore = create<Store>()((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user: User | undefined) => set({ user, isAuthenticated: !!user }),
}));

export default useAuthStore;
