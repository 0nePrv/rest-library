import React, {useState} from 'react';

export const GenreForm = ({data: genre = {}, handleSubmit, handleCancel}) => {

  const [name, setName] = useState({
    name: genre.name || '',
  });

  const handleInputChange = (event) => {
    const {id, value} = event.target;
    setName((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const process = () => {
    console.log('Обработка ввода:', name);
    genre.name = name
    handleSubmit(genre);
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
              value={genre.name}
              onChange={handleInputChange}
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
