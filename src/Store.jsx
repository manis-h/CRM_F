import { create } from "zustand";

const Store = (set, get) => ({
  login:false,
  employeeDetails:null,
  empInfo:null,
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
  setEmpInfo: (payload) => {
    
    set(() => ({
      empInfo:payload
    }));
  },
});

const useStore = create(Store);

export default useStore;
