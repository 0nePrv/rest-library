import '../../pages/item.css'

export const AuthorComponent = ({props : author}) => {
  return (
      <div key={author.id}>
        <p className={"name"}>{author.name}</p>
      </div>
  )
}