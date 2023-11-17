import {Route, Routes} from "react-router-dom";
import {ListPage} from "../pages/ListPage";
import {EditPage} from "../pages/EditPage";
import {CreatePage} from "../pages/CreatePage";
import {GenreForm} from "../model/genre/GenreForm";
import {GenreDisplay} from "../model/genre/GenreDisplay";

export const GenreRoutes = () => {

  const route = {
    resource: 'genre',
    name: 'Genres',
    Form: GenreForm,
    Display: GenreDisplay
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