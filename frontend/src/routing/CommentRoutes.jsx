import {Route, Routes} from "react-router-dom";
import {EditPage} from "../pages/EditPage";
import {CreatePage} from "../pages/CreatePage";
import {CommentForm} from "../model/comment/CommentForm";

export const CommentRoutes = () => {

  const resource = 'comment'
  const name = 'Comments'

  return (
      <Routes>
        <Route path={`/${resource}/edit/:id`} element={
          <EditPage Component={CommentForm} displayName={name}
                    resource={resource}/>}/>
        <Route path={`/${resource}/new`} element={
          <CreatePage Component={CommentForm} displayName={name}
                      resource={resource}/>}/>
        <Route path={`/${resource}/*`} element={<h1>Page not found</h1>}/>
      </Routes>
  )
}