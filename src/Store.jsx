import { create } from "zustand";

const Store = (set, get) => ({
  login:false,
  setLogin: (payload) => {
    
    set((state) => ({
      login:payload
    }));
  },
});

const useStore = create(Store);

export default useStore;
