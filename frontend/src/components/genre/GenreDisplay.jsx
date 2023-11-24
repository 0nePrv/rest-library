import React from "react"
import '../../styles/item.css'

export const GenreDisplay = ({props: genre}) => {
  return (
      <div key={genre.id}>
        <p className={"name"}>{genre?.name}</p>
      </div>
  )
}