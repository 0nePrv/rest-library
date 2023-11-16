import '../../pages/item.css'

export const CommentComponent = ({props : comment}) => {
  return (
      <div key={comment.id}>
        <p className={"name"}>{comment?.bookName}</p>
        <p>{comment.text}</p>
      </div>
  )
}