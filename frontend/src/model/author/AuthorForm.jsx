import React, {useEffect, useState} from 'react';

export const AuthorForm = ({data: author = {}, handleSubmit, handleCancel}) => {

  const initialState = author?.name || '';

  const [name, setName] = useState(initialState);

  useEffect(() => {
    if (author?.name) {
      setName(author.name)
    }
  }, [author?.name]);

  const process = () => {
    if (author.name) {
      author.name = name
      handleSubmit(author)
    } else {
      console.log('Invalid name:', name);
    }
  };

  return (
      <form onSubmit={(e) => {
        e.preventDefault();
        process();
      }}>
        <div className="row">
          <label htmlFor="name-input">Name:</label>
          <input
              type="text"
              id="name-input"
              placeholder={author?.name}
              value={name || initialState}
              onChange={(event) => setName(event.target.value)}
          />
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
