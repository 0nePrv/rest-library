import React from "react"
import '../../styles/item.css'

export const CommentDisplay = ({props : comment}) => {
  return (
      <div key={comment.id}>
        <p>{comment?.text}</p>
      </div>
  )
}