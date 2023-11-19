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

  const commentRoute = {
    resource: 'comment',
    name: 'Comments',
    Form: CommentForm,
    Display: CommentDisplay
  }

  return (
      <Routes>
        <Route path={'/'} element={
          <ListPage Component={route.Display}
                    displayName={route.name}
                    resource={route.resource}/>
        }
        />
        <Route path={'/edit/:id'} element={
          <EditPage Component={route.Form}
                    displayName={route.name}
                    resource={route.resource}/>
        }
        />
        <Route path={'/new'}
               element={
                 <CreatePage Component={route.Form}
                             displayName={route.name}
                             resource={route.resource}/>
               }
        />

        <Route path={`/:bookId/${commentRoute.resource}`}
               element={
                 <ListPage Component={commentRoute.Display}
                           displayName={commentRoute.name}
                           resource={commentRoute.resource}/>
               }
        />
        <Route path={`/:bookId/${commentRoute.resource}/edit/:id`}
               element={
                 <EditPage Component={commentRoute.Form}
                           displayName={commentRoute.name}
                           resource={commentRoute.resource}/>
               }
        />
        <Route path={`/:bookId/${commentRoute.resource}/new`}
               element={
                 <CreatePage Component={commentRoute.Form}
                             displayName={commentRoute.name}
                             resource={commentRoute.resource}/>
               }
        />

        <Route path={'/*'} element={<h1>Page not found</h1>}/>
      </Routes>
  )
}