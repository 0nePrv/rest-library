import React from "react"
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
} from 'react-router-dom';
import styles from "../App.module.css";
import {Navbar} from "../ui/Navbar";
import {AuthorRoutes} from "./AuthorRoutes";
import {GenreRoutes} from "./GenreRoutes";
import {BookRoutes} from "./BookRoutes";

export const Routing = () => {
  return (
      <div className={styles.App}>
        <Router>
          <Navbar/>
          <Routes>
            <Route path={'/'} element={<Navigate to={'/book'}/>}/>
            <Route path={'/book/*'} element={<BookRoutes/>}/>
            <Route path={'/author/*'} element={<AuthorRoutes/>}/>
            <Route path={'/genre/*'} element={<GenreRoutes/>}/>
          </Routes>
        </Router>
      </div>
  );
};
