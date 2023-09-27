import React, { useState } from "react";
import './SearchBar.scss'


type Props ={
    searchValue:string;
    setSearchValue:(value:string)=>void
}
export default function SearchBar(props:Props) {
    const {searchValue, setSearchValue}=props

  

  return (
    <>
      <div className="searchBar">
        <label htmlFor="searchInput" className="searchLabel">Busqueda: </label>
        <input
          type="text"
          className="searchInput"
          placeholder="Que buscas?"
          value={searchValue}
          onChange={(event)=>setSearchValue(event.target.value)}
        />
      </div>
    </>
  );
}
