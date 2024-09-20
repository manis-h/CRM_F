import { create } from "zustand";

const Store = (set, get) => ({
  login:false,
  employee:null,
  setLogin: (payload) => {
    
    set(() => ({
      login:payload
    }));
  },

  setEmployee: (payload) => {
    
    set(() => ({
      employee:payload
    }));
  },
});

const useStore = create(Store);

export default useStore;
