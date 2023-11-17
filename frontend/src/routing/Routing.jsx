import {BrowserRouter as Router} from 'react-router-dom';
import styles from "../App.module.css";
import {Navbar} from "../components/Navbar";
import {AuthorRoutes} from "./AuthorRoutes";
import {GenreRoutes} from "./GenreRoutes";
import {CommentRoutes} from "./CommentRoutes";
import {BookRoutes} from "./BookRoutes";

export const Routing = () => {
  return (
      <div className={styles.App}>
        <Router>
          <Navbar/>
          <AuthorRoutes/>
          <GenreRoutes/>
          <BookRoutes/>
          <CommentRoutes/>
        </Router>
      </div>
  );
};
