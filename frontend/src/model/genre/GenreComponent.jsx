import '../../pages/item.css'

export const GenreComponent = ({props: genre}) => {
  return (
      <div key={genre.id}>
        <p className={"name"}>{genre.name}</p>
      </div>
  )
}