import {useNavigate, useParams} from "react-router-dom";
import {libraryApi} from "../api/libraryApi";
import {BookForm} from "../model/book/BookForm";

export const CreatePage = ({
  resource = 'book',
  Component = BookForm,
  displayName = 'Books'
}) => {

  const navigate = useNavigate()

  const {bookId} = useParams()

  const {create} = libraryApi(resource)

  const onSubmit = async (data) => {
    await create(data);
    if (resource === 'comment') {
      navigate(`/book/${data?.bookId || bookId}/comment`)
      console.log(data?.bookId)
    } else {
      navigate(`/${resource}`)
    }
  }

  const doNavigate = () => {
    if (resource === 'comment') {
      navigate(`/book/${bookId}/comment`)
    } else {
      navigate(`/${resource}`)
    }
  }

  return (
      <div>
        <h1>{displayName} create page</h1>
        <Component handleSubmit={onSubmit} handleCancel={doNavigate}/>
      </div>
  )
}