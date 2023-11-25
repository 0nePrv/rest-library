import {AuthorForm} from "../components/author/AuthorForm";
import {AuthorDisplay} from "../components/author/AuthorDisplay";
import {BookForm} from "../components/book/BookForm";
import {BookDisplay} from "../components/book/BookDisplay";
import {CommentForm} from "../components/comment/CommentForm";
import {CommentDisplay} from "../components/comment/CommentDisplay";
import {GenreForm} from "../components/genre/GenreForm";
import {GenreDisplay} from "../components/genre/GenreDisplay";
import {ResourceConfig, ResourceType} from "../types/resourceTypes";
import {Author, Book, Comment, DomainType, Genre} from "../types/domainTypes";

const authorRouteConfig: ResourceConfig<Author> = {
  resource: ResourceType.Author,
  name: 'Authors',
  Form: AuthorForm,
  Display: AuthorDisplay
}

const bookRouteConfig: ResourceConfig<Book> = {
  resource: ResourceType.Book,
  name: 'Books',
  Form: BookForm,
  Display: BookDisplay
}

const commentRouteConfig: ResourceConfig<Comment> = {
  resource: ResourceType.Comment,
  name: 'Comments',
  Form: CommentForm,
  Display: CommentDisplay
}

const gerneRouteConfig: ResourceConfig<Genre> = {
  resource: ResourceType.Genre,
  name: 'Genres',
  Form: GenreForm,
  Display: GenreDisplay
}

const navBarRoutesConfigs: ResourceConfig<DomainType>[] = [
  bookRouteConfig,
  authorRouteConfig,
  gerneRouteConfig,
]

export {authorRouteConfig, gerneRouteConfig, commentRouteConfig, bookRouteConfig, navBarRoutesConfigs}
