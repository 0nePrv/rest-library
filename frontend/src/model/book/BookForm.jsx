import React, {useEffect, useState} from 'react';
import {useLibraryApi} from "../../hooks/useLibraryApi";
import {useQuery} from "react-query";

export const BookForm = ({data: book = {}, handleSubmit, handleCancel}) => {

  const initialName = book?.name || '';
  const [name, setName] = useState(initialName);

  const initialAuthorId = book?.authorId || 0;
  const [authorId, setAuthorId] = useState(initialAuthorId);

  const initialGenreId = book?.genreId || 0;
  const [genreId, setGenreId] = useState(initialGenreId);

  const {data: genres, getAll: getAllGenres} = useLibraryApi('genre');
  const {data: authors, getAll: getAllAuthors} = useLibraryApi('author');

  const {error: genreErrors, genreIsLoading} = useQuery(['getAll', 'genre'],
      () => getAllGenres());
  const {error: authorErrors, authorIsLoading} = useQuery(['getAll', 'author'],
      () => getAllAuthors());

  useEffect(() => {
    if (book?.name && book?.authorId && book?.genreId) {
      setName(book.name);
      setAuthorId(book.authorId);
      setGenreId(book.genreId);
    }
  }, [book?.name, book?.authorId, book?.genreId]);

  if (authorIsLoading || genreIsLoading) {
    return <h1>Loading...</h1>;
  }

  if (authorErrors || genreErrors) {
    return (
        <div>
          <h1>${authorErrors.message}</h1>
          <h1>${genreErrors.message}</h1>
        </div>
    );
  }

  const process = () => {
    if (name && authorId && genreId) {
      const updatedBook = {...book, name, authorId, genreId};
      handleSubmit(updatedBook);
    } else {
      console.log('Invalid values: ', name, authorId, genreId);
    }
  };

  return (
      <form
          onSubmit={(e) => {
            e.preventDefault();
            process();
          }}>
        <div className="row">
          <label htmlFor="name-input">Name:</label>
          <input type="text" id="name-input" placeholder={book?.name}
                 value={name || initialName}
                 onChange={(event) => setName(event.target.value)}/>
        </div>
        <div className="row">
          <label htmlFor="author-select">Author:</label>
          <select
              id="author-select"
              value={authorId || initialAuthorId}
              onChange={(event) => setAuthorId(
                  Number.parseInt(event.target.value))}>
            <option value={0}>Select an author</option>
            {authors && authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
            ))}
          </select>
        </div>
        <div className="row">
          <label htmlFor="genre-select">Genre:</label>
          <select
              id="genre-select"
              value={genreId || initialGenreId}
              onChange={(event) => setGenreId(
                  Number.parseInt(event.target.value))}>
            <option value={0}>Select a genre</option>
            {genres && genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
            ))}
          </select>
        </div>
        <div className="row">
          <input type="submit" value="Submit"/>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
  );
};
