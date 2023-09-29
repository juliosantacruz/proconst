import React, { useState } from "react";
import { Insumo } from "../../types/Insumo";
import AnyIcon from "../AnyIcon";
import editIcon from "../../assets/icons/bx-edit.svg";
import deleteIcon from "../../assets/icons/bx-trash.svg";
import addIcon from "../../assets/icons/bx-plus-circle.svg";
import { useInsumoStore } from "../../store/projectStore";
import { useUxStore } from "../../store/uxStore";
import "./TableInsumo.scss";
import { setFormat } from "../../utils/CurrencyFormat";
import { CategoriasInsumos } from "../../utils/SelectInputOptions";
import SearchBar from "../SearchBar";

type Props = { insumosData: Insumo[]; addInputInsumo?: (id: string) => void };

export default function TableInsumo({ insumosData, addInputInsumo }: Props) {
  const { setInsumoToUpdate, deleteInsumo } = useInsumoStore();
  const { openModalFormInsumo } = useUxStore();

  const data: Insumo[] = insumosData;
 
  const handleDelete = (id: string) => {
    deleteInsumo(id);
  };
  const handleEdit = (element: Insumo) => {
    console.log(`se editar ${element.id}`);
    setInsumoToUpdate(element);
    openModalFormInsumo(true);
  };

  const [filter, setFilter] = useState("todos");
  const filtrarCategorias = (data: Insumo[], categoria: string) => {
    let arrData: Insumo[] = [];
    if (filter === "todos") {
      arrData = data;
    } else {
      arrData = data.filter((insumo) => insumo.categoria === categoria);
    }
    arrData.sort((a,b)=>  a.clave.localeCompare(b.clave))
    return arrData;
  };
  const tabClassName =(category?:string)=>{
    if(filter===category){
      return 'tab active'
    }else{
      return 'tab'
    }
  }
  const TabFilters=()=>{

    
    return(<div className="tabsFiltred">
        <button type="button" className={filter==='todos'?"tab active":"tab"} onClick={() => setFilter("todos")}>
          Todos
        </button>
        {CategoriasInsumos.map((category) => {

          return (
            <button key={category.name} type="button" className={tabClassName(category.name)} onClick={() => setFilter(category.name)}>
              {category.name}
            </button>
          );
        })}
      </div>)
  }

  const [searchValue, setSearchValue] = useState<string>("");
  console.log(searchValue)

  let searchedInsumos:Insumo[] =[]
  if(searchValue.length>0){
    searchedInsumos= data.filter((insumo)=>{
      const description = insumo.descripcion.toLocaleLowerCase()
      const searchText  = searchValue.toLowerCase() 
      return description.includes(searchText)
    })
  }else{
    searchedInsumos = data
  }


  return (
    <div className="insumoList">
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue}/>
      <TabFilters/>
      <div className="insumosTable">
        <table className="tableDefault tableInsumo">
          <thead>
            <tr>
              <td>Clave</td>
              <td>Descripcion</td>
              <td>Unidad</td>
              <td>Precio</td>
              <td>Categoria</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              filtrarCategorias(searchedInsumos, filter)?.map((insumo: Insumo) => {
                return (
                  <tr key={insumo.id}>
                    <td className="clave">{insumo.clave}</td>
                    <td className="descripcion">{insumo.descripcion}</td>
                    <td className="unidad">{insumo.unidad}</td>
                    <td className="precio">{setFormat(insumo.precio)}</td>
                    <td className="categoria">{insumo.categoria}</td>
                    <td className="actions">
                      {addInputInsumo ? (
                        <>
                          <a onClick={() => handleEdit(insumo)}>
                            <AnyIcon
                              className={"icon"}
                              iconSrc={editIcon}
                              iconWidth={14}
                              iconHeight={14}
                            />
                          </a>
                          |
                          <a
                            type="button"
                            onClick={() => addInputInsumo(insumo.id)}
                          >
                            <AnyIcon
                              iconSrc={addIcon}
                              iconWidth={14}
                              iconHeight={14}
                            />
                          </a>
                        </>
                      ) : (
                        <>
                          <a onClick={() => handleEdit(insumo)}>
                            <AnyIcon
                              className={"icon"}
                              iconSrc={editIcon}
                              iconWidth={14}
                              iconHeight={14}
                            />
                          </a>
                          |
                          <a onClick={() => handleDelete(insumo.id)}>
                            <AnyIcon
                              iconSrc={deleteIcon}
                              iconWidth={14}
                              iconHeight={14}
                            />
                          </a>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <p>no data</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
