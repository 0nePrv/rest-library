import React, {FC} from "react"
import '../../styles/item.css'
import {Comment, IDisplayOptions} from "../../types/types";

export const CommentDisplay : FC<IDisplayOptions<Comment>> = ({obj: comment}) => {
  return (
      <div key={comment.id}>
        <p>{comment.text}</p>
      </div>
  )
}