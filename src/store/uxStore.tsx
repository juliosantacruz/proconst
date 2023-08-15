// this state store it is created for all interface interactions, like open and close modal


import { create } from "zustand";

interface UxState{
    openModal: boolean,
    setOpenModal: (value:boolean)=>void,
    modalFormInsumo: boolean,
    openModalFormInsumo: (value:boolean)=>void,
    modalFormConcepto: boolean,
    openModalFormConcepto: (value:boolean)=>void,
    modalFormPartida: boolean,
    openModalFormPartida: (value:boolean)=>void,
    modalFormProject: boolean,
    openModalFormProject: (value:boolean)=>void,
}

export const useUxStore = create<UxState>((set)=>({
    openModal:false,
    setOpenModal:(value:boolean)=>set(()=>({openModal:value})),
    modalFormInsumo: false,
    openModalFormInsumo: (value:boolean)=>set(()=>({modalFormInsumo:value})),
    modalFormConcepto: false,
    openModalFormConcepto: (value:boolean)=>set(()=>({modalFormConcepto:value})),
    modalFormPartida: false,
    openModalFormPartida: (value:boolean)=>set(()=>({modalFormPartida:value})),
    modalFormProject: false,
    openModalFormProject: (value:boolean)=>set(()=>({modalFormProject:value})),
}))


 