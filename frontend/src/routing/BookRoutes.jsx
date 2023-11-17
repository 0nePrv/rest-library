import {Route, Routes} from "react-router-dom";
import {ListPage} from "../pages/ListPage";
import {EditPage} from "../pages/EditPage";
import {CreatePage} from "../pages/CreatePage";
import {BookForm} from "../model/book/BookForm";
import {BookDisplay} from "../model/book/BookDisplay";
import {CommentDisplay} from "../model/comment/CommentDisplay";
import {CommentForm} from "../model/comment/CommentForm";

export const BookRoutes = () => {

  const route = {
    resource: 'book',
    name: 'Books',
    Form: BookForm,
    Display: BookDisplay
  }

  return (
      <Routes>
        <Route path={'/'} element={
          <ListPage Component={route.Display} displayName={route.name}
                    resource={route.resource}/>}/>
        <Route path={'/edit/:id'} element={
          <EditPage Component={route.Form} displayName={route.name}
                    resource={route.resource}/>}/>
        <Route path={'/new'} element={
          <CreatePage Component={route.Form} displayName={route.name}
                      resource={route.resource}/>}/>

        <Route path={'/:bookId/comment'} element={
          <ListPage Component={CommentDisplay} displayName={'Comments'}
                    resource={'comment'}/>}/>
        <Route path={'/:bookId/comment/edit/:id'} element={
          <EditPage Component={CommentForm} displayName={'Comments'}
                    resource={'comment'}/>}/>
        <Route path={'/:bookId/comment/new'} element={
          <CreatePage Component={CommentForm} displayName={'Comments'}
                      resource={'comment'}/>}/>
        <Route path={'/*'} element={<h1>Page not found</h1>}/>
      </Routes>
  )
}