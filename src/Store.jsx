import { create } from "zustand";

const Store = (set, get) => ({
  login:false,
  employeeDetails:null,
  setLogin: (payload) => {
    
    set(() => ({
      login:payload
    }));
  },

  setEmployeeDetails: (payload) => {
    
    set(() => ({
      employeeDetails:payload
    }));
  },
});

const useStore = create(Store);

export default useStore;
