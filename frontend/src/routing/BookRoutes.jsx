import {Route, Routes} from "react-router-dom";
import {ListPage} from "../pages/ListPage";
import {EditPage} from "../pages/EditPage";
import {CreatePage} from "../pages/CreatePage";
import {BookForm} from "../model/book/BookForm";
import {BookComponent} from "../model/book/BookComponent";
import {CommentComponent} from "../model/comment/CommentComponent";

export const BookRoutes = () => {

  const route = {
    resource: 'book',
    name: 'Books',
    Form: BookForm,
    Display: BookComponent
  }

  return (
      <Routes>
        <Route path={`/${(route.resource)}`} element={
          <ListPage Component={route.Display} displayName={route.name}
                    resource={route.resource}/>}/>
        <Route path={`/${(route.resource)}/:bookId/comment`} element={
          <ListPage Component={CommentComponent} displayName={'Comments'}
                    resource={'comment'}/>}/>
        <Route path={`/${(route.resource)}/edit/:id`} element={
          <EditPage Component={route.Form} displayName={route.name}
                    resource={route.resource}/>}/>
        <Route path={`/${(route.resource)}/new`} element={
          <CreatePage Component={route.Form} displayName={route.name}
                      resource={route.resource}/>}/>
        <Route path={`/${(route.resource)}/*`}
               element={<h1>Page not found</h1>}/>
      </Routes>
  )
}