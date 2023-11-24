import '../../styles/item.css'
import React, {FC} from 'react';
import {Author, IDisplayOptions} from "../../types/types";

export const AuthorDisplay : FC<IDisplayOptions<Author>> = ({obj: author}) => {
  return (
      <div key={author.id}>
        <p className={"name"}>{author?.name}</p>
      </div>
  )
}