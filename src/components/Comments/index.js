import {Component} from 'react'
import {v4} from 'uuid'

import CommentItem from '../CommentItem/index'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

const iniCommentsList = []

class Comments extends Component {
  state = {commentsList: iniCommentsList, name: '', comment: ''}

  addComment = event => {
    event.preventDefault()
    const {name, comment} = this.state
    const initialContainerBackgroundClass = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: v4(),
      name,
      comment,
      date: new Date(),
      isLiked: false,
      initialClassNames: initialContainerBackgroundClass,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
    }))
  }

  onInputChange = event => {
    this.setState({name: event.target.value})
  }

  onChangeTextarea = event => {
    this.setState({comment: event.target.value})
  }

  deleteComment = id => {
    const {commentsList} = this.state
    const filteredList = commentsList.filter(each => each.id !== id)
    this.setState({commentsList: filteredList})
  }

  toggleLikeFunc = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(each => {
        if (each.id === id) {
          return {...each, isLiked: !each.isLiked}
        }
        return each
      }),
    }))
  }

  render() {
    const {commentsList, name, comment} = this.state
    const count = commentsList.length

    return (
      <div className="bg-container">
        <div className="cont">
          <div className="comments-input">
            <form className="form">
              <h1 className="heading">Comments</h1>
              <p className="quote">Say something about 4.0 Technologies</p>
              <input
                placeholder="Your Name"
                onChange={this.onInputChange}
                value={name}
                className="name-input"
              />
              <textarea
                rows="6"
                placeholder="Your Comment"
                onChange={this.onChangeTextarea}
                value={comment}
                className="text-input"
              />
              <button
                className="button"
                type="button"
                onClick={this.addComment}
              >
                Add Comment
              </button>
            </form>
            <img
              className="img"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
          </div>
          <hr className="line" />
          <p className="comments">
            <span>{count}</span>
            Comments
          </p>
          <ul className="comments">
            {commentsList.map(each => (
              <CommentItem
                eachComment={each}
                key={each.id}
                deleteComment={this.deleteComment}
                toggleLikeFunc={this.toggleLikeFunc}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
