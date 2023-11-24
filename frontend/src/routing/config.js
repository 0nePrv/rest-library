import {AuthorForm} from "../components/author/AuthorForm";
import {AuthorDisplay} from "../components/author/AuthorDisplay";
import {BookForm} from "../components/book/BookForm";
import {BookDisplay} from "../components/book/BookDisplay";
import {CommentForm} from "../components/comment/CommentForm";
import {CommentDisplay} from "../components/comment/CommentDisplay";
import {GenreForm} from "../components/genre/GenreForm";
import {GenreDisplay} from "../components/genre/GenreDisplay";

const authorRouteConfig = {
  resource: 'author',
  name: 'Authors',
  Form: AuthorForm,
  Display: AuthorDisplay
}

const bookRouteConfig = {
  resource: 'book',
  name: 'Books',
  Form: BookForm,
  Display: BookDisplay
}

const commentRouteConfig = {
  resource: 'comment',
  name: 'Comments',
  Form: CommentForm,
  Display: CommentDisplay
}

const gerneRouteConfig = {
  resource: 'genre',
  name: 'Genres',
  Form: GenreForm,
  Display: GenreDisplay
}

export {
  authorRouteConfig,
  gerneRouteConfig,
  commentRouteConfig,
  bookRouteConfig
}