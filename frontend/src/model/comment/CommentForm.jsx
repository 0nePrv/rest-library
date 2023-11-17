import React, {useEffect, useState} from 'react';
import {useLibraryApi} from "../../hooks/useLibraryApi";
import {useQuery} from "react-query";

export const CommentForm = ({
  data: comment = {},
  handleSubmit,
  handleCancel
}) => {

  const initTextState = comment?.text || '';
  const [text, setText] = useState(initTextState);

  const initBookIdState = comment?.bookId || 0;
  const [bookId, setBookId] = useState(initBookIdState);

  const {data: books, getAll} = useLibraryApi('book');

  const {error, isLoading} = useQuery(['getAll', 'book'],
      () => getAll());

  useEffect(() => {
    if (comment?.text && comment?.bookId) {
      setText(comment.text);
      setBookId(comment.bookId);
    }
  }, [comment?.text, comment?.bookId]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return (
        <h1>${error.message}</h1>
    );
  }

  const process = () => {
    if (text && bookId) {
      comment.name = text;
      comment.authorId = bookId;
      handleSubmit(comment);
    } else {
      console.log('Invalid values: ', text, bookId);
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
          <textarea
              id="name-input"
              placeholder={comment?.text}
              value={text || initTextState}
              onChange={(event) => setText(event.target.value)}/>
        </div>
        <div className="row">
          <label htmlFor="book-select">Genre:</label>
          <select id="book-select"
                  value={bookId || initBookIdState}
                  onChange={(event) => setBookId(
                      Number.parseInt(event.target.value))}>
            <option value={0}>Select a book</option>
            {books && books.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.name}
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
