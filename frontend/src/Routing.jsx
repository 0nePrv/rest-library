import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {ListPage} from "./pages/ListPage";
import styles from "./App.module.css"
import {BookComponent} from "./model/book/BookComponent";
import {GenreComponent} from "./model/genre/GenreComponent";
import {AuthorComponent} from "./model/author/AuthorComponent";
import {Navbar} from "./components/Navbar";
import {EditPage} from "./pages/EditPage";
import {BookForm} from "./model/book/BookForm";
import {AuthorForm} from "./model/author/AuthorForm";
import {GenreForm} from "./model/genre/GenreForm";

export const Routing = () => {

  const routes = [
    {
      resource: 'book',
      DisplayComponent: BookComponent,
      FormComponent: BookForm,
      name: 'Books'
    },
    {
      resource: 'author',
      DisplayComponent: AuthorComponent,
      FormComponent: AuthorForm,
      name: 'Authors'
    },
    {
      resource: 'genre',
      DisplayComponent: GenreComponent,
      FormComponent: GenreForm,
      name: 'Genres'
    }
  ]

  // noinspection JSValidateTypes
  return (
      <div className={styles.App}>
        <Router>
          <Navbar props={routes}/>
          <Routes>
            {routes.map(
                route =>
                    <Route path={`/${route.resource}`}
                           element={
                             <ListPage
                                 resource={`${route.resource}`}
                                 Component={route.DisplayComponent}
                                 displayName={route.name}/>
                           }/>
            )}
            {routes.map(
                route =>
                <Route path={`/${route.resource}/edit/:id`}
                       element={
                         <EditPage
                             resource={route.resource}
                             Component={route.FormComponent}
                             displayName={route.name}/>
                       }/>
            )}
            <Route path={"*"} element={<h1>Page not found</h1>}/>
          </Routes>
        </Router>
      </div>
  )
}
