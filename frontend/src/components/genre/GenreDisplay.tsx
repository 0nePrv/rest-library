import React, {FC} from "react"
import '../../styles/item.css'
import {IDisplayOptions} from "../../types/pageFormTypes";
import {Genre} from "../../types/domainTypes";

export const GenreDisplay: FC<IDisplayOptions<Genre>> = ({obj: genre}) => {
  return (
      <div key={genre.id}>
        <p className={"name"}>{genre.name}</p>
      </div>
  )
}