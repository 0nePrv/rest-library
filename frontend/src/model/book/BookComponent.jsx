import {useNavigate} from "react-router-dom";
import '../../pages/item.css'
import '../../components/button.css'

export const BookComponent = ({props : book}) => {

  const navigation = useNavigate();

  return (
      <div key={book.id}>
        <p className={"name"}>{book.name}</p>
        <p>{book?.authorName}</p>
        <p>{book?.genreName}</p>
        <button className={"button"} onClick={() => navigation(`/book/${book.id}/comment`)}>
          See comments
        </button>
      </div>
  )
}