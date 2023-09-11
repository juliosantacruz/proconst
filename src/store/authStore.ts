import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  token: string;
  setToken: (token: string) => void;
  isAuth:boolean,
  setIsAuth:(value:boolean)=>void
  profile:unknown,
  setProfile:(data:unknown) => void
  setLogout:()=>void
};

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      token: "",
      setToken: (token: string) => set((state) => ({ ...state, token: token, isAuth:true })),
      isAuth:false,
      setIsAuth: (value)=> set((state)=>({...state, isAuth:value})),
      profile:'',
      setProfile:(data:unknown)=>set(()=>({
        profile:data
      })),
      setLogout:()=>set({
        token:'',
        isAuth:false,
        profile:{}
      })
    }),
    { name: "auth" }
  )
);
