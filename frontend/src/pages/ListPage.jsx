import {useQuery} from "react-query";
import {libraryApi} from "../api/libraryApi";
import {BookDisplay} from "../model/book/BookDisplay";
import "../styles/button.css"
import "../styles/list.css"
import {ActionPanel} from "../ui/ActionPannel";
import {useNavigate, useParams} from "react-router-dom";
import {Loading} from "../ui/Loading";

export const ListPage = ({
  resource = 'book',
  Component = BookDisplay,
  displayName = 'Books'
}) => {

  const {remove, getAll} = libraryApi(resource);

  const {bookId} = useParams()

  const navigate = useNavigate()

  const doQuery = () => {
    if (resource === 'comment' && bookId) {
      return getAll({params: {bookId}})
    }
    return getAll({})
  }

  const {
    data,
    refetch,
    isLoading,
    error
  } = useQuery(['getAll', resource], doQuery);

  if (isLoading) {
    return <Loading/>
  }
  if (error) {
    return <h1>{error.message}</h1>
  }

  const onCreate = () => {
    if (resource === 'comment') {
      navigate(`/book/${bookId}/comment/new`)
    } else {
      navigate(`/${resource}/new`)
    }
  }

  const onEdit = (obj) => {
    if (resource === 'comment') {
      navigate(`/book/${obj.bookId}/comment/edit/${obj.id}`)
    } else {
      navigate(`/${resource}/edit/${obj.id}`)
    }
  }

  const onDelete = async (obj) => {
    await remove({id: obj.id});
    await refetch();
  }

  return (
      <div>
        <div className={"header"}>
          <h1>{displayName} page</h1>
          <button className={"button"} title={"refresh"} onClick={refetch}>
            <img src="/icons/refresh.png" alt={"refresh"}/>
          </button>
          <button className={"button"} title={"add"} onClick={onCreate}>
            <img src={"/icons/plus.png"} alt={"new"}/>
          </button>
        </div>
        <div className={"container"}>
          {data ? data.map(obj =>
              <div key={obj?.id} className={"item"}>
                <Component props={obj}/>
                <ActionPanel obj={obj}
                             handleUpdate={() => onEdit(obj)}
                             handleDelete={() => onDelete(obj)}/>
              </div>
          ) : <p>{displayName} not found</p>}
        </div>
      </div>
  )
}