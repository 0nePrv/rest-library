export const EditForm = ({data, onFormSubmit}) => {
  return (
      <form onSubmit={() => onFormSubmit()}>
        <input type={"text"} placeholder={"Title"}/>
        <input className={"button"} type={"submit"}/>
      </form>
  )
}