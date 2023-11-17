import {Route, Routes} from "react-router-dom";
import {ListPage} from "../pages/ListPage";
import {EditPage} from "../pages/EditPage";
import {CreatePage} from "../pages/CreatePage";
import {GenreForm} from "../model/genre/GenreForm";
import {GenreComponent} from "../model/genre/GenreComponent";

export const GenreRoutes = () => {

  const route = {
    resource: 'genre',
    name: 'Genres',
    Form: GenreForm,
    Display: GenreComponent
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