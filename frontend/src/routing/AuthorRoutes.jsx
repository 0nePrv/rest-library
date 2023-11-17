import {Route, Routes} from "react-router-dom";
import {ListPage} from "../pages/ListPage";
import {EditPage} from "../pages/EditPage";
import {CreatePage} from "../pages/CreatePage";
import {AuthorForm} from "../model/author/AuthorForm";
import {AuthorComponent} from "../model/author/AuthorComponent";

export const AuthorRoutes = () => {

  const route = {
    resource: 'author',
    name: 'Authors',
    Form: AuthorForm,
    Display: AuthorComponent
  }

  return (
      <Routes>
        <Route path={`/${(route.resource)}`} element={
          <ListPage Component={route.Display} displayName={route.name}
                    resource={route.resource}/>}/>
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