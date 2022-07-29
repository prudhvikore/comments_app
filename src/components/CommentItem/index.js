import {formatDistanceToNow} from 'date-fns'

import './index.css'

const CommentItem = props => {
  const {eachComment, deleteComment, toggleLikeFunc} = props
  const {id, name, comment, isLiked, initialClassNames, date} = eachComment
  const initial = name[0].toUpperCase()
  const postedTime = formatDistanceToNow(date)

  const likeImageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const btnClass = isLiked ? 'active' : ''

  const delComment = () => {
    deleteComment(id)
  }

  const toggleLike = () => {
    toggleLikeFunc(id)
  }

  return (
    <li className="comment-item">
      <div className="comment-container">
        <div className={initialClassNames}>
          <p className="initial">{initial}</p>
        </div>
        <div>
          <div className="username-time-container">
            <p className="username">{name}</p>
            <p className="time">{postedTime} ago</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="buttons-container">
        <div className="like-container">
          <img src={likeImageUrl} alt="like" className="like-image" />
          <button
            className={`button-del ${btnClass}`}
            type="button"
            onClick={toggleLike}
          >
            Like
          </button>
        </div>
        <button
          className="button-del"
          type="button"
          testid="delete"
          onClick={delComment}
        >
          <img
            className="delete"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr className="comment-line" />
    </li>
  )
}

export default CommentItem
