import React, {FC} from "react"
import '../styles/action-panel.css'
import '../styles/button.css'

export interface IActionPanel {
  handleUpdate: () => void;
  handleDelete: () => void;
}


export const ActionPanel : FC<IActionPanel> = ({handleUpdate, handleDelete}) => {

  const onDelete = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    handleDelete()
  }

  const onUpdate = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    handleUpdate()
  }

  return (
      <div className="action-panel">
        <button className={"button update-button"} onClick={onUpdate}>
          <img src="/icons/edit.png" alt="edit"/>
        </button>
        <button className="button delete-button" onClick={onDelete}>
          <img src="/icons/delete.png" alt="Delete"/>
        </button>
      </div>
  );
};