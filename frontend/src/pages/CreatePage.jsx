import {useNavigate} from "react-router-dom";
import {useLibraryApi} from "../hooks/useLibraryApi";
import {BookForm} from "../model/book/BookForm";

export const CreatePage = ({
  resource = 'book',
  Component = BookForm,
  displayName = 'Books'
}) => {

  const navigate = useNavigate()

  const {create} = useLibraryApi(resource)

  const handleSubmit = async (data) => {
    await create(data);
    doNavigate()
  }

  const doNavigate = () => {
    navigate(`/${resource}`)
  }

  return (
      <div>
        <h1>{displayName} create page</h1>
        <Component handleSubmit={handleSubmit} handleCancel={doNavigate}/>
      </div>
  )
}