

import { useState } from "react"
import { deleteComment } from "../../store/comments"
import { useDispatch } from "react-redux"
import './commentEdit.css'


const CommentEdit = ({ comment, setShowCommentEditBox }) => {

    const dispatch = useDispatch()

    const [showCommentEditOptions, setShowCommentEditOptions] = useState(false)


    const commentEditOptions = () => {
        if (showCommentEditOptions === true) setShowCommentEditOptions(false)
        else setShowCommentEditOptions(true)
    }

    const handleCommentEditClick = (e) => {
        e.preventDefault()
        setShowCommentEditBox(true)
    }


    const handleDeleteCommentClick = (e) => {
        e.preventDefault()
        dispatch(deleteComment(comment.id))
    }


    return (
        <>
            <i onClick={commentEditOptions} className="fa-solid fa-ellipsis-vertical three-dots">
                {
                    showCommentEditOptions ?
                        <div className="comment-edit-options-dropdown">
                            <div onClick={handleCommentEditClick}>
                                <i className="fa-solid fa-pen"></i>
                                <button>Edit</button>
                            </div>
                            <div onClick={handleDeleteCommentClick}>
                                <i className="fa-solid fa-trash-can"></i>
                                <button>Delete</button>
                            </div>
                        </div>
                        :
                        null
                }

            </i>
        </>
    )
}

export default CommentEdit
