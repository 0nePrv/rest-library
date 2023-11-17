import React, {useEffect, useState} from 'react';

export const GenreForm = ({data: genre = {}, handleSubmit, handleCancel}) => {

  const initialState = genre?.name || '';

  const [name, setName] = useState(initialState);

  useEffect(() => {
    if (genre?.name) {
      setName(genre.name)
    }
  }, [genre?.name]);

  const process = () => {
    if (genre.name) {
      genre.name = name
      handleSubmit(genre)
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
              placeholder={genre?.name}
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
