import React, {FC} from "react"
import '../../styles/item.css'
import {IDisplayOptions} from "../../types/pageFormTypes";
import {Comment} from "../../types/domainTypes";

export const CommentDisplay : FC<IDisplayOptions<Comment>> = ({obj: comment}) => {
  return (
      <div key={comment.id}>
        <p>{comment.text}</p>
      </div>
  )
}