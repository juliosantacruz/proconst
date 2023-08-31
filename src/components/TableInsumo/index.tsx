import React from "react";
import { Insumo } from "../../types/Insumo";
import AnyIcon from "../AnyIcon";
import editIcon from "../../assets/icons/bx-edit.svg";
import deleteIcon from "../../assets/icons/bx-trash.svg";
import { useInsumoStore } from "../../store/projectStore";
import { useUxStore } from "../../store/uxStore";
import './TableInsumo.scss'
import { setFormat } from "../../utils/CurrencyFormat";

export default function TableInsumo({ insumosData }: any) {
  const { setInsumoToUpdate, deleteInsumo } = useInsumoStore();
  const { openModalFormInsumo } = useUxStore();

  const data: Insumo[] = insumosData;

  console.log(data);

  const handleDelete = (id: string) => {
    deleteInsumo(id);
  };
  const handleEdit = (element: Insumo) => {
    console.log(`se editar ${element.id}`);
    setInsumoToUpdate(element); 
    openModalFormInsumo(true);
  };


  return (
    <table className="tableInsumo">
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
          data?.map((insumo: Insumo) => {
            return (
              <tr key={insumo.id}>
                <td className="clave">{insumo.clave}</td>
                <td className="descripcion">{insumo.descripcion}</td>
                <td className="unidad">{insumo.unidad}</td>
                <td className="precio">{setFormat(insumo.precio)}</td>
                <td className="categoria">{insumo.categoria}</td>
                <td className="actions">
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
                </td>
              </tr>
            );
          })
        ) : (
          <p>no data</p>
        )}
      </tbody>
    </table>
  );
}
