import React, {useState} from "react"
import {useQuery} from "react-query";
import {libraryApi} from "../api/libraryApi";
import {BookDisplay} from "../model/book/BookDisplay";
import "../styles/button.css"
import "../styles/list.css"
import {ActionPanel} from "../ui/ActionPannel";
import {useNavigate, useParams} from "react-router-dom";
import {Loading} from "../ui/Loading";
import {ErrorDisplay} from "../ui/ErrorDisplay";

export const ListPage = ({
  resource = 'book',
  Component = BookDisplay,
  displayName = 'Books'
}) => {

  const [deleteError, setDeleteError] = useState(null);

  const {remove, getAll} = libraryApi(resource);

  const {bookId} = useParams()

  const navigate = useNavigate()

  const doQuery = () => {
    let params = {}
    if (resource === 'comment') {
      params = {bookId}
    }
    return getAll({params})
  }

  const {
    data,
    refetch,
    isLoading,
    error
  } = useQuery(['getAll', resource], doQuery);

  const onCreate = () => {
    const base = resource === 'comment' ? `/book/${bookId}/comment`
        : `/${resource}`;
    navigate(`${base}/new`);
  }

  const onEdit = (obj) => {
    const base = resource === 'comment' ? `/book/${obj.bookId}/comment`
        : `/${resource}`;
    navigate(`${base}/edit/${obj.id}`);
  }

  const onDelete = async (obj) => {
    try {
      const deleteResponse = await remove({id: obj.id});
      await refetch()
      console.log('DELETE RESPONSE: ', deleteResponse)
      setDeleteError(null)
    } catch (error) {
      console.error('DELETE ERROR: ', error)
      setDeleteError(error)
    }
  }

  if (isLoading) {
    return <Loading/>
  }

  if (error) {
    return <ErrorDisplay error={error}/>
  }

  if (deleteError) {
    return <ErrorDisplay error={deleteError}/>
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
        {(data && data.length !== 0) ?
            (<div className={"container"}>
              {data.map(obj =>
                  <div key={obj?.id} className={"item"}>
                    <Component props={obj}/>
                    <ActionPanel obj={obj}
                                 handleUpdate={() => onEdit(obj)}
                                 handleDelete={() => onDelete(obj)}/>
                  </div>)}
            </div>) :
            <p className={"notFound"}>{displayName} not found</p>}
      </div>
  )
}