import {create} from "zustand"
import { persist } from "zustand/middleware"

const authStore = persist(
    (set) => ({
        empInfo:null,
        isLoggedIn: false,
        setLogin: (loginStatus) => set({ isLoggedIn: loginStatus }),
        setEmpInfo: (info) => set({ empInfo: info }),
    }),
    {
        name: 'auth-storage',
        getStorage: () => localStorage,
    }
)

const useAuthStore = create(authStore)

export default useAuthStore