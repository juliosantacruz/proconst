// this state store it is created for all interface interactions, like open and close modal


import { create } from "zustand";

interface UxState{
    openModal: boolean,
    setOpenModal: (value:boolean)=>void,
    // modalFormConcepto: boolean,
    // openModalFormConcepto: (value:boolean)=>void,
}

export const useUxStore = create<UxState>((set)=>({
    openModal:false,
    setOpenModal:(value:boolean)=>set(()=>({openModal:value})),
    // modalFormConcepto:false,
    // openModalFormConcepto:(value:boolean)=>set(()=>({modalFormConcepto:value}))
}))


 