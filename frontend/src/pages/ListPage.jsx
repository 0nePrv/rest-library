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

  const {getAll} = libraryApi(resource);

  const {bookId: id} = useParams()

  const navigate = useNavigate()

  const doQuery = () => {
    return getAll(resource === 'comment' && id && {bookId: id})
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

  const processCreate = () => {
    if (resource === 'comment' && id) {
      navigate(`/book/${id}/comment/new`)
    } else {
      navigate(`/${resource}/new`)
    }
  }

  return (
      <div>
        <div className={"header"}>
          <h1>{displayName} page</h1>
          <button className={"button"} title={"refresh"} onClick={refetch}>
            <img src="/icons/refresh.png" alt={"refresh"}/>
          </button>
          <button className={"button"} title={"add"} onClick={processCreate}>
            <img src={"/icons/plus.png"} alt={"new"}/>
          </button>
        </div>
        <div className={"container"}>
          {data ? data.map(obj =>
              <div key={obj?.id} className={"item"}>
                <Component props={obj}/>
                <ActionPanel obj={obj} resource={resource} refetch={refetch}/>
              </div>
          ) : <p>{displayName} not found</p>}
        </div>
      </div>
  )
}