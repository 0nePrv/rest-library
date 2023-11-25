import '../../styles/item.css'
import React, {FC} from 'react';
import {IDisplayOptions} from "../../types/pageFormTypes";
import {Author} from "../../types/domainTypes";

export const AuthorDisplay : FC<IDisplayOptions<Author>> = ({obj: author}) => {
  return (
      <div key={author.id}>
        <p className={"name"}>{author.name}</p>
      </div>
  )
}