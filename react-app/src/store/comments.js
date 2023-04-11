import { normalize } from "./helper"

const LOAD_COMMENTS = 'comments/LOAD_COMMENTS'
const CREATE_COMMENT = 'comments/CREATE_COMMENT'
const EDIT_COMMENT = 'comments/EDIT_COMMENT'
const DELETE_COMMENT = 'comments/DELETE_COMMENT'

const loadComments = (comments) => ({
    type: LOAD_COMMENTS,
    data: comments
});

const createComment = (comment) => ({
    type: CREATE_COMMENT,
    data: comment
});

const editComment = (comment) => ({
    type: EDIT_COMMENT,
    data: comment
});

const removeComment = (commentId) => ({
    type: DELETE_COMMENT,
    data: commentId
});


export const getComments = (videoId) => async (dispatch) => {

    const response = await fetch(`/api/comments/${videoId}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadComments(data))
        return null

    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }

    } else {
        return ['An error occurred. Please try again.']
    }
}



export const postComment = (comment, videoId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${videoId}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    });

    if (response.ok) {

        const data = await response.json()
        dispatch(createComment(data))
        return null

    } else if (response.status < 500) {
        const data = await response.json()
        if (data.errors) {
            return data.errors
        }

    } else {
        return ['An error occurred. Please try again.']
    }
}

export const putComment = (comment) => async (dispatch) => {

    const response = await fetch(`/api/comments/${comment.id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(editComment(data))
        return null

    } else if (response.status < 500) {
        const data = await response.json()
        if (data.errors) {
            return data.errors
        }

    } else {
        return ['An error occurred. Please try again.']
    }
}

export const deleteComment = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        dispatch(removeComment(commentId))

    } else if (response.status < 500) {
        const data = await response.json()
        if (data.errors) {
            return data.errors
        }

    } else {
        return ['An error occurred. Please try again.']
    }
}


export default function reducer(state = { comments: {} }, action) {

    switch (action.type) {
        case LOAD_COMMENTS: {
            const newState = { comments: {} }
            newState.comments = normalize(action.data.comments)
            return newState
        }

        case CREATE_COMMENT: {
            const newState = { comments: { ...state.comments } }
            newState.comments[action.data.id] = action.data
            return newState
        }

        case EDIT_COMMENT: {
            const newState = { comments: { ...state.comments } }
            newState.comments[action.data.id] = action.data
            return newState
        }
        /* falls through */
        case DELETE_COMMENT: {
            const newState = { comments: { ...state.comments } }
            delete newState.comments[action.data]
            return newState
        }

        default:
            return state;
    }
}
