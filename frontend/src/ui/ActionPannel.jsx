import React from "react"
import '../styles/action-panel.css'
import '../styles/button.css'

export const ActionPanel = ({handleUpdate, handleDelete}) => {

  const onDelete = (e) => {
    e.preventDefault()
    handleDelete()
  }

  const onUpdate = (e) => {
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