import create from "zustand"
import { persist } from "zustand/middleware"

const authStore = persist(
    (set) => ({
        isLoggedIn: false,
        setLogin: (loginStatus) => set({ isLoggedIn: loginStatus }),
    }),
    {
        name: 'auth-storage',
        getStorage: () => localStorage,
    }
)

const useAuthStore = create(authStore)

export default useAuthStore