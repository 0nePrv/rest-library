import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {useLibraryApi} from "../hooks/useLibraryApi";
import {BookForm} from "../model/book/BookForm";
import {Loading} from "../ui/Loading";

export const EditPage = ({
  resource = 'book',
  Component = BookForm,
  displayName = 'Books'
}) => {

  const {update, get} = useLibraryApi(resource)

  const {bookId, id} = useParams()

  const navigate = useNavigate();

  const {data, error, isLoading} = useQuery(['update', resource], () => get(id))

  if (isLoading) {
    return <Loading/>
  }
  if (error) {
    return <h1>${error.message}</h1>
  }

  const handleSubmit = async (data) => {
    await update(data)
    doNavigate(data)
  }

  const doNavigate = (obj = data) => {
    if (resource === 'comment') {
      navigate(`/book/${obj?.bookId || bookId}/comment`)
    } else {
      navigate(`/${resource}`)
    }
  }

  return (
      <div>
        <h1>{displayName} edit page</h1>
        <Component data={data}
                   handleSubmit={handleSubmit}
                   handleCancel={doNavigate}/>
      </div>
  )
}