import React from 'react'
import './TableConcepto.scss'
import AnyIcon from '../AnyIcon';
import { Concepto } from '../../types/Concepto';
import { useConceptoStore, useInsumoStore } from '../../store/projectStore';
import { useUxStore } from '../../store/uxStore';
import editIcon from "../../assets/icons/bx-edit.svg";
import deleteIcon from "../../assets/icons/bx-trash.svg";
import { setFormat } from '../../utils/CurrencyFormat';


export default function TableConcepto() {
  const { modalFormConcepto, openModalFormConcepto } = useUxStore();

    const { insumos } = useInsumoStore();
    const { conceptos, setConceptoToUpdate, deleteConcepto } = useConceptoStore();

    const handleEdit = (element: Concepto) => {
        setConceptoToUpdate(element);
        openModalFormConcepto(true);
        console.log(`se editar ${element.id}`);
      };
      const handleDelete = (id: string) => {
        deleteConcepto(id);
      };


  return (
    <>
    <div className="searchBar">
<label htmlFor="searchInput">Busqueda: </label>
    <input type="text" className="searchInput" placeholder='Buscas un concepto?'/>
    </div>
    <table className="ListadoConceptos">
        <thead>
          <tr>
            <td>Clave</td>
            <td>Descripcion</td>
            <td>Unidad</td>
            <td>Precio</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {conceptos &&
            conceptos.map((concepto) => {
              return (
                <tr key={concepto.id}>
                  <td className="clave">{concepto.clave}</td>
                  <td className="descripcion">{concepto.descripcion}</td>
                  <td className="unidad">{concepto.unidad}</td>
                  <td className="precio">
                    {setFormat(concepto.precioUnitario as number)}
                  </td>
                  <td className="actions">
                    <>
                      <a onClick={() => handleEdit(concepto)}>
                        <AnyIcon
                          className={"icon"}
                          iconSrc={editIcon}
                          iconWidth={14}
                          iconHeight={14}
                        />
                      </a>{" "}
                      |
                      <a onClick={() => handleDelete(concepto.id)}>
                        <AnyIcon
                          iconSrc={deleteIcon}
                          iconWidth={14}
                          iconHeight={14}
                        />
                      </a>
                    </>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  )
}
