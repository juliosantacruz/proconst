// this state store it is created for all interface interactions, like open and close modal


import { create } from "zustand";

interface UxState{
    openModal: boolean,
    setOpenModal: (value:boolean)=>void,
    modalFormInsumo: boolean,
    openModalFormInsumo: (value:boolean)=>void,
    modalFormTarea: boolean,
    openModalFormTarea: (value:boolean)=>void,
    modalFormConcepto: boolean,
    openModalFormConcepto: (value:boolean)=>void,
    modalFormPartida: boolean,
    openModalFormPartida: (value:boolean)=>void,
    modalFormProject: boolean,
    openModalFormProject: (value:boolean)=>void,
    modalFormLoad: boolean,
    openModalFormLoad: (value:boolean)=>void,
    isWorkingProject:boolean,
    setIsWorkingProject:(value:boolean)=>void
}

export const useUxStore = create<UxState>((set)=>({
    openModal:false,
    setOpenModal:(value:boolean)=>set(()=>({openModal:value})),
    modalFormInsumo: false,
    openModalFormInsumo: (value:boolean)=>set(()=>({modalFormInsumo:value})),
    modalFormTarea: false,
    openModalFormTarea: (value:boolean)=>set(()=>({modalFormTarea:value})),
    modalFormConcepto: false,
    openModalFormConcepto: (value:boolean)=>set(()=>({modalFormConcepto:value})),
    modalFormPartida: false,
    openModalFormPartida: (value:boolean)=>set(()=>({modalFormPartida:value})),
    modalFormProject: false,
    openModalFormProject: (value:boolean)=>set(()=>({modalFormProject:value})),
    modalFormLoad: false,
    openModalFormLoad: (value:boolean)=>set(()=>({modalFormLoad:value})),
    isWorkingProject: false,
    setIsWorkingProject: (value:boolean)=>set(()=>({isWorkingProject:value})),
}))


 