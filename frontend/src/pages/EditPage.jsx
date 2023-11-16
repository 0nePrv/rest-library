import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {useLibraryApi} from "../hooks/useLibraryApi";
import {BookForm} from "../model/book/BookForm";

export const EditPage = ({
  resource = 'book',
  Component = BookForm,
  displayName = 'Books'
}) => {

  const {update, get, data} = useLibraryApi(resource)

  const {id} = useParams()

  const navigate = useNavigate();

  const {error: errors, isLoading} = useQuery(`$update${resource}`,
      () => get(id))

  if (isLoading) {
    return <h1>Loading...</h1>
  }
  if (errors) {
    return <h1>${errors.message}</h1>
  }

  const handleSubmit = async (data) => {
    await update(data);
    navigate(`/${resource}`)
  }

  return (
      <div>
        <h1>{displayName} edit page</h1>
        <Component data={data} handleSubmit={handleSubmit}
                   handleCancel={() => navigate(`/${resource}`)}/>
      </div>
  )
}