import { normalize } from "./helper"

const ADD_SUBSCRIBER = 'subscribers/ADD_SUBSCRIBER'
const REMOVE_SUBSCRIBER = 'subscribers/REMOVE_SUBSCRIBER'
const LOAD_SUBSCRIBED = 'subscribers/LOAD_SUBSCRIBED'

const loadSubscribed = (subscribedList) => ({
    type: LOAD_SUBSCRIBED,
    data: subscribedList
})

const addSubscriber = (user) => ({
  type: ADD_SUBSCRIBER,
  data: user
});

const removeSubscriber = (userId) => ({
  type: REMOVE_SUBSCRIBER,
  data: userId
});


export const getSubscribedList = () => async (dispatch) => {
    const response = await fetch(`/api/subscribers/`)

    if (response.ok) {
        const data = await response.json()
        dispatch(loadSubscribed(data))
        return null

    } else {
        return ['An error occurred. Please try again.']
    }
}


export const subscribe = (userId) => async (dispatch) => {
  const response = await fetch(`/api/subscribers/${userId}`, {
    method: "POST"
  })

  if (response.ok) {
    const data = await response.json()
    dispatch(addSubscriber(data.user))
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

export const unsubscribe = (userId) => async (dispatch) => {

    const response = await fetch(`/api/subscribers/${userId}`, {
      method: "DELETE"
    })

    if (response.ok) {

      dispatch(removeSubscriber(userId))
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

export default function reducer(state = { subscribed: {} }, action) {

  switch (action.type) {
    case LOAD_SUBSCRIBED: {
      const newState = { subscribed: {} }
      newState.subscribed = normalize(action.data.subscribed)
      return newState
    }

    case ADD_SUBSCRIBER: {
      const newState = { subscribed: {...state.subscribed} }
      newState.subscribed[action.data.id] = action.data
      return newState
    }

    case REMOVE_SUBSCRIBER: {
      const newState = { subscribed: {...state.subscribed}}
      delete newState.subscribed[action.data]
      return newState
    }
    default:
      return state;
  }
}
