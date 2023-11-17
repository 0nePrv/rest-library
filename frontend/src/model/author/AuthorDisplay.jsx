import '../../styles/item.css'

export const AuthorDisplay = ({props : author}) => {
  return (
      <div key={author.id}>
        <p className={"name"}>{author.name}</p>
      </div>
  )
}