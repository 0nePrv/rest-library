import React, {FC} from "react"
import '../../styles/item.css'
import {Genre, IDisplayOptions} from "../../types/types";

export const GenreDisplay: FC<IDisplayOptions<Genre>> = ({obj: genre}) => {
  return (
      <div key={genre.id}>
        <p className={"name"}>{genre.name}</p>
      </div>
  )
}