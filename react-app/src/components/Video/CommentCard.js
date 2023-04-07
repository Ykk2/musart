import { useSelector, useDispatch } from "react-redux";
import CommentEdit from "./CommentEdit";
import { useState, useEffect } from "react";
import { putComment } from "../../store/comments";
import { dateConverter } from "../../store/helper";
import './commentCard.css'


const CommentCard = ({ comment }) => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)

    const [showCommentEditBox, setShowCommentEditBox] = useState(false)
    const [edittedComment, setEdittedComment] = useState(comment.comment)
    const [commentSubmit, setCommentSubmit] = useState("")


    useEffect(() => {
        if (edittedComment?.length <= 0) setCommentSubmit('comment-not-ready')
        else setCommentSubmit('comment-ready')
    }, [edittedComment])


    const commentOwner = (commentorId) => {
        if (+commentorId === +user?.id) return true
        else return false
    }

    const handleCancelCommentEditClick = (e) => {
        e.preventDefault()
        setShowCommentEditBox(false)
    }

    const updateComment = (e) => {
        e.preventDefault()
        setEdittedComment(e.target.value)
        e.target.style.height = "10px"
        e.target.style.height = `${e.target.scrollHeight}px`

    }

    const handleSaveCommentClick = (e) => {
        e.preventDefault()
        setShowCommentEditBox(false)
        const data = {"comment": edittedComment, "id": comment.id}
        dispatch(putComment(data))
    }

    // const dateConverter = (date) => {
    //     const newDate = new Date(date)
    //     return `${newDate.toLocaleString('en-US', { month: 'short' })} ${newDate.getDate()}`
    // }

    return (
        <div className="comment-container">
            {
                showCommentEditBox ?
                    <div className="edit-comment-box">
                        <div>

                        </div>
                        <div className="edit-comment-box-textarea">
                            <textarea
                                type='text'
                                name='comment-box'
                                onChange={updateComment}
                                value={edittedComment}
                                maxLength='1000'
                            />
                            <span>
                                <button onClick={handleCancelCommentEditClick}>Cancel</button>
                                <button className={`${commentSubmit}`} onClick={handleSaveCommentClick}>Save</button>
                            </span>
                        </div>
                    </div>
                    :
                    <div className="comment-card">
                        <div></div>
                        <div className="comment">
                            <span>{comment?.user?.username}</span>
                            <span>{dateConverter(comment?.createdAt)}</span>
                            <div>{comment?.comment}</div>
                        </div>
                    </div>
            }
            {
                commentOwner(comment?.user?.id)
                    ?
                    <CommentEdit comment={comment} setShowCommentEditBox={setShowCommentEditBox} />
                    :
                    null
            }
        </div>
    )
}

export default CommentCard
