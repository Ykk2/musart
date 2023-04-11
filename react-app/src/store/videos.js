import { normalize } from "./helper"

const LOAD_VIDEOS = 'video/LOAD_VIDEOS'
const LOAD_VIDEO = 'video/LOAD_VIDEO'
const CREATE_VIDEO = 'video/CREATE_VIDEO'
const EDIT_VIDEO = 'video/EDIT_VIDEO'
const DELETE_VIDEO = 'video/DELETE_VIDEO'
const UPVOTE_VIDEO = 'video/UPVOTE_VIDEO'
const DOWNVOTE_VIDEO = 'video/DOWNVOTE_VIDEO'
const NEUTRAL_VIDEO = 'video/NEUTRAL_VIDEO'
const LIKE_VIDEO = 'video/LIKE_VIDEO'
const DISLIKE_VIDEO = 'video/DISLIKE_VIDEO'

const loadVideos = (videos) => ({
  type: LOAD_VIDEOS,
  data: videos
});

const loadVideo = (video) => ({
  type: LOAD_VIDEO,
  data: video
});

const createVideo = (video) => ({
  type: CREATE_VIDEO,
  data: video
});

const editVideo = (video) => ({
  type: EDIT_VIDEO,
  data: video
});

const removeVideo = (videoId) => ({
  type: DELETE_VIDEO,
  data: videoId
});

const upvote = (videoId) => ({
  type: UPVOTE_VIDEO,
  data: videoId
})

const downvote = (videoId) => ({
  type: DOWNVOTE_VIDEO,
  data: videoId
})

const setNeutral = (videoId) => ({
  type: NEUTRAL_VIDEO,
  data: videoId
})

const setLiked = (videoId) => ({
  type: LIKE_VIDEO,
  data: videoId
})

const setDisliked = (videoId) => ({
  type: DISLIKE_VIDEO,
  data: videoId
})

export const upvoteVideo = (videoId) => async (dispatch) => {
  const response = await fetch(`/api/videos/${videoId}/like`, {
    method: "POST"
  })
  if (response.ok) {
    const data = await response.json()

    if (data.user.liked === 'liked') {
      return (dispatch(upvote(videoId)), dispatch(setLiked(videoId)))
    }

    if (data.user.liked === 'neutral') {
      return (dispatch(downvote(videoId)), dispatch(setNeutral(videoId)))
    }

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

export const downvoteVideo = (videoId) => async (dispatch) => {
  const response = await fetch(`/api/videos/${videoId}/dislike`, {
    method: "POST"
  })
  if (response.ok) {
    const data = await response.json()

    if (data.status === "new") {
      return (dispatch(setDisliked(videoId)))
    }

    if (data.user.liked ==='disliked' && data.status ==="previously liked") {
      return dispatch(setDisliked(videoId), dispatch(downvote(videoId)))
    }

    if (data.user.liked === 'disliked') {
      return dispatch(setDisliked(videoId))
    }

    if (data.user.liked ==='neutral') {
      return (dispatch(setNeutral(videoId)))
    }

  } else if (response.status < 500) {
    const data = await response.json();

    if (data.errors) {
      return data.errors;
    }

  } else {
    return ['An error occurred. Please try again.']
  }
}


export const getVideos = () => async (dispatch) => {

  const response = await fetch('/api/videos');

  if (response.ok) {
    const data = await response.json();
    dispatch(loadVideos(data))
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

export const getUserVideos = (userId) => async (dispatch) => {

  const response = await fetch(`/api/videos/user/${userId}`);
  if (response.ok) {
    const data = await response.json();
    if (data) {
      console.log(data)
      dispatch(loadVideos(data))
      return null
    }
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }

  } else {
    return ['An error occurred. Please try again.']
  }
}

export const getVideo = (videoId) => async (dispatch) => {
  const response = await fetch(`/api/videos/${videoId}`);

  if (response.ok) {
    const data = await response.json()
    dispatch(loadVideo(data))
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

export const postVideo = (video) => async (dispatch) => {
  const response = await fetch('/api/videos/new', {
    method: "POST",
    body: video
  });
  if (response.ok) {
    const data = await response.json()
    dispatch(createVideo(data))
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

export const putVideo = (video) => async (dispatch) => {
  const response = await fetch(`/api/videos/${video.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(video)
  });

  if (response.ok) {
    const data = await response.json()
    dispatch(editVideo(data))
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

export const deleteVideo = (videoId) => async (dispatch) => {
  const response = await fetch(`/api/videos/${videoId}`, {
    method: "DELETE"
  });

  if (response.ok) {
    dispatch(removeVideo(videoId))
    }

    else if (response.status < 500) {
    const data = await response.json()

    if (data.errors) {
      return data.errors
    }

  } else {
    return ['An error occurred. Please try again.']
  }
}

export const getUserSubscribedVideos = (userId) => async (dispatch) => {

  const response = await fetch(`/api/videos/user/subscribed/${userId}`);
  if (response.ok) {
    const data = await response.json();
    if (data) {
      console.log(data)
      dispatch(loadVideos(data))
      return null
    }
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }

  } else {
    return ['An error occurred. Please try again.']
  }
}


export default function reducer(state = { videos: {}, video: {} }, action) {

  switch (action.type) {
    case LOAD_VIDEOS: {
      const newState = { videos: {}, video: {...state.video} }
      newState.videos = normalize(action.data.videos)
      return newState
    }
    case LOAD_VIDEO: {
      const newState = { videos: { ...state.videos }, video: {} }
      newState.video = action.data.video
      return newState
    }

    case CREATE_VIDEO: {
      const newState = { videos: { ...state.videos }, video: { ...state.video } }
      newState.videos[action.data.id] = action.data
      return newState
    }

    case EDIT_VIDEO: {
      const newState = { videos: { ...state.videos }, video: { ...state.video } }
      newState.videos[action.data.id] = action.data
    }
    /* falls through */
    case DELETE_VIDEO: {
      const newState = { videos: { ...state.videos }, video: { ...state.video } }

      delete newState.videos[action.data]
      return newState
    }

    case UPVOTE_VIDEO: {
      const newState = { videos: { ...state.videos }, video: { ...state.video } }
      newState.video.likes++
      return newState
    }

    case DOWNVOTE_VIDEO:
      const newState = { videos: { ...state.videos }, video: { ...state.video } }
      newState.video.likes--
      return newState

    case LIKE_VIDEO: {
      const newState = { videos: { ...state.videos }, video: { ...state.video } }
      newState.video.userLiked = 'liked'
      return newState
    }

    case DISLIKE_VIDEO: {
      const newState = { videos: { ...state.videos }, video: { ...state.video } }
      newState.video.userLiked = 'disliked'
      return newState
    }

    case NEUTRAL_VIDEO: {
      const newState = { videos: { ...state.videos }, video: { ...state.video } }
      newState.video.userLiked = 'neutral'
      return newState
    }

    default:
      return state;
  }
}
