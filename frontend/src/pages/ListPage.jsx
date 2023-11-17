import {useQuery} from "react-query";
import {useLibraryApi} from "../hooks/useLibraryApi";
import {BookComponent} from "../model/book/BookComponent";
import "../components/button.css"
import "./list.css"
import {ActionPanel} from "../components/ActionPannel";
import {useParams} from "react-router-dom";

export const ListPage = ({
  resource = 'book',
  Component = BookComponent,
  displayName = 'Books'
}) => {

  const {data, getAll} = useLibraryApi(resource);

  const {bookId: id} = useParams()

  const {error: errors, isLoading, refetch} = useQuery(
      ['getAll', resource],
      () => getAll(resource === 'comment' && {bookId: id}));

  if (isLoading) {
    return <h1>Loading...</h1>
  }
  if (errors) {
    return <h1>${errors.message}</h1>
  }
  return (
      <div>
        <div className={"header"}>
          <h1>{displayName} page</h1>
          <button className={"button"} onClick={() => refetch()}>
            <img src="/icons/refresh.png" alt={"refresh"}/>
          </button>
        </div>
        <div className={"container"}>
          {data && data.map(obj =>
              <div key={obj?.id} className={"item"}>
                <Component props={obj}/>
                <ActionPanel obj={obj}
                             resource={resource}
                             refetch={() => refetch()}/>
              </div>
          )}
        </div>
      </div>
  )
}