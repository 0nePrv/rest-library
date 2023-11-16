export const AuthorForm = ({data: author = {}, handleSubmit, handleCancel}) => {
  return (
      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor={"name-input"}>Name:</label>
          <input type={"text"} id={"name-input"} content={author.name}/>
        </div>
        <div className="row">
          <input type="submit" value="Submit"/>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
  )
}