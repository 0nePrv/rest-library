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
    await create({payload: data});
    if (resource === 'comment') {
      navigate(`/book/${data?.bookId || bookId}/comment`)
    } else {
      navigate(`/${resource}`)
    }
  }

  const onCancel = () => {
    if (resource === 'comment') {
      navigate(`/book/${bookId}/comment`)
    } else {
      navigate(`/${resource}`)
    }
  }

  return (
      <div>
        <h1>{displayName} create page</h1>
        <Component handleSubmit={onSubmit} handleCancel={onCancel}/>
      </div>
  )
}