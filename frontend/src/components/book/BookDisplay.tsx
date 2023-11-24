import React, {FC} from "react"
import {useNavigate} from "react-router-dom";
import '../../styles/item.css'
import '../../styles/button.css'
import {Book, IDisplayOptions} from "../../types/types";

export const BookDisplay: FC<IDisplayOptions<Book>> = ({obj: book}) => {

  const navigate = useNavigate();

  return (
      <div className={"book-item"} key={book.id}>
        <div className={"info"}>
          <p className={"name"}>{book?.name}</p>
          <p>{book.authorName}</p>
          <p>{book.genreName}</p>
        </div>
        <button className={"button"}
                onClick={() => navigate(`/book/${book.id}/comment`)}>
          See comments
        </button>
      </div>
  )
}