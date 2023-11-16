import {useLibraryApi} from "../hooks/useLibraryApi";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";

export const EditPage = (resource, displayName, Component) => {

  const {update, get, data} = useLibraryApi(resource)

  const {id} = useParams()

  const {error: errors, isLoading} = useQuery(`$update${resource}`,
      () => get(id))

  if (isLoading) {
    return <h1>Loading...</h1>
  }
  if (errors) {
    return <h1>${errors.message}</h1>
  }

  const onSubmitForm = async (data) => {
    return await update(data);
  }

  return (
      <div>

      </div>
  )
}