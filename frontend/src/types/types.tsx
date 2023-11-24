import {FC} from "react";

export interface Book {
  resource: ResourceType.Book;
  id: number;
  name: string;
  authorId: number;
  authorName?: string;
  genreId: number;
  genreName?: string;
}

export interface Genre {
  resource: ResourceType.Genre;
  id: number;
  name: string;
}

export interface Author {
  resource: ResourceType.Author;
  id: number;
  name: string;
}

export interface Comment {
  resource: ResourceType.Comment;
  id: number;
  text: string;
  bookId: number;
}

export enum ResourceType {
  Book = 'book',
  Comment = 'comment',
  Author = 'author',
  Genre = 'genre',
}

export interface IFormOptions<T> {
  obj?: T,
  handleSubmit: (obj: T) => void;
  handleCancel: () => void;
}

export interface IDisplayOptions<T> {
  obj: T
}

export interface ResourceConfig<T> {
  resource: ResourceType,
  name : string,
  Form: FC<IFormOptions<T>>,
  Display: FC<IDisplayOptions<T>>
}