import {Route, Routes} from "react-router-dom";
import {ListPage} from "../pages/ListPage";
import {EditPage} from "../pages/EditPage";
import {CreatePage} from "../pages/CreatePage";
import {AuthorForm} from "../model/author/AuthorForm";
import {AuthorDisplay} from "../model/author/AuthorDisplay";

export const AuthorRoutes = () => {

  const route = {
    resource: 'author',
    name: 'Authors',
    Form: AuthorForm,
    Display: AuthorDisplay
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
        <Route path={'/*'} element={<h1>Page not found</h1>}/>
      </Routes>
  )
}