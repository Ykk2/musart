import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { useParams, NavLink, useHistory } from "react-router-dom";
import { getComments, postComment } from "../../store/comments"
import { getVideo, getVideos, upvoteVideo, downvoteVideo } from "../../store/videos"
import { getSubscribedList, subscribe, unsubscribe } from "../../store/subscribers";
import { dateConverter, viewsConverter } from "../../store/helper";
import NavBar from "../Navigation/NavBar";
import CommentCard from "./CommentCard";
import './videoDetails.css'


const VideoDetails = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { videoId } = useParams()

    const videos = useSelector(state => Object.values(state.videos.videos))
    const video = useSelector(state => state.videos.video)
    const comments = useSelector(state => Object.values(state.comments.comments))
    const user = useSelector(state => state.session.user)
    const subscribedList = useSelector(state => Object.values(state.subscribers.subscribed))

    const [focused, setFocused] = useState(false)
    const [comment, setComment] = useState("")
    const [commentSubmit, setCommentSubmit] = useState("")
    const [liked, setLiked] = useState("")
    const [disliked, setDisliked] = useState("")
    const [subscribed, setSubscribed] = useState()
    const [showUnsubscribe, setShowUnsubscribe] = useState(false)

    // useEffect for initial data load and state change
    useEffect(() => {
        dispatch(getComments(videoId))
        dispatch(getVideos())
        dispatch(getVideo(videoId))
        if (user) {
            dispatch(getSubscribedList(user.id))
        }
    }, [dispatch, videoId, user])


    // useEffect to track upvote/downvote mechanism
    useEffect(() => {
        if (video.userLiked === "liked") {
            setLiked("liked")
            setDisliked("")
        }
        else if (video.userLiked === "disliked") {
            setDisliked("disliked")
            setLiked("")
        } else if (video.userLiked === "neutral") {
            setDisliked("")
            setLiked("")
        }
    }, [video])


    // useEffect to disable/enable comment button
    useEffect(() => {
        if (comment?.length <= 0 || !comment?.trim()) setCommentSubmit('comment-not-ready')
        else setCommentSubmit('comment-ready')
    }, [comment])


    // useEffect to check if user is subscribed to video owner
    useEffect(() => {
        const found = subscribedList.find(user => user.id === video.ownerId)
        if (found) setSubscribed(true)
        else setSubscribed(false)
    }, [subscribedList])


    const updateComment = (e) => {
        e.preventDefault()
        setComment(e.target.value)
        e.target.style.height = "10px"
        e.target.style.height = `${e.target.scrollHeight}px`
    }

    const handleCommentSubmit = (e) => {
        e.preventDefault()
        if (!user) {
           return history.push('/login')
        }
        dispatch(postComment({comment}, videoId))
        setFocused(false)
        setComment("")
    }

    const handleSubscribeClick = (e) => {
        e.preventDefault()
        if (!user) {
            return history.push('/login')
        }
        dispatch(subscribe(video.ownerId))
    }

    const handleUnsubscribeClick = (e) => {
        e.preventDefault()
        if (!user) {
            return history.push('/login')
        }
        dispatch(unsubscribe(video.ownerId))
    }

    const handleShowUnsubscribe = (e) => {
        e.preventDefault()
        if (!showUnsubscribe) setShowUnsubscribe(true)
        else setShowUnsubscribe(false)
    }

    const handleLikeClick = (e) => {
        if (!user) {
            return history.push('/login')
        }
        e.preventDefault()
        setLiked("liked")
        dispatch(upvoteVideo(videoId))
    }

    const handleDisLikeclick = (e) => {
        if (!user) {
            return history.push('/login')
        }
        e.preventDefault()
        dispatch(downvoteVideo(videoId))
    }

    const showOptions = () => {
        setFocused(true)
    }


    const hideOptions = () => {
        setFocused(false)
        setComment("")
        const textArea = document.getElementById("textarea")
        textArea.style.height = "10px"
    }

    return (
        <>
            <NavBar />
            <div className="video-details">
                <div className="main-content">
                    <div className="main-video">
                        <video src={video?.videoUrl} controls autoPlay />
                    </div>
                    <div className="video-info">
                        <div id="video-title">
                            {video.title}
                        </div>
                        <div id="channel-info">
                            <div id="channel-info-left">
                                <div id="channel-info-left-left">
                                    <div>

                                    </div>
                                    <div>
                                        <div>{video?.user?.username}</div>
                                        <div>{video?.user?.subscribers} {+video?.user?.subscribers <= 1 ? "subscriber" : "subscribers"}</div>
                                    </div>
                                </div>
                                {
                                subscribed ?

                                    <button onClick={handleShowUnsubscribe} className="subscribed-button">
                                        <i className="fa-regular fa-bell"></i>
                                            Subscribed
                                        <i className="fa-solid fa-chevron-down"></i>
                                        {
                                        showUnsubscribe ?
                                        <div className="notification-menu">
                                            <div onClick={handleUnsubscribeClick} className="unsubscribe">
                                                <i className="fa-solid fa-user-minus fa-flip-horizontal"></i>
                                                <span>unsubscribe</span>
                                            </div>
                                        </div>
                                        :
                                        null
                                        }
                                    </button>
                                    :
                                    <button onClick={handleSubscribeClick} className="subscribe-button">
                                        Subscribe
                                    </button>
                                }
                            </div>
                            <div id="channel-info-right">
                                <div className={`channel-info-right-upvote ${liked}`} onClick={handleLikeClick}>
                                    <i className={`fa-sharp fa-solid fa-thumbs-up ${liked}`}></i>
                                    <span>{video.likes}</span>
                                </div>
                                <div className={`channel-info-right-downvote ${disliked}`} onClick={handleDisLikeclick}>
                                    <i className={`fa-solid fa-thumbs-down fa-flip-horizontal ${disliked}`}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="video-description">
                        <span>{viewsConverter(video.totalViews)} {dateConverter(video.createdAt)}</span>
                        <div>{video?.description}</div>
                    </div>
                    <div className="comment-total">
                        {`${comments?.length} Comments`}
                    </div>
                    <div className="comment-box">
                        <div id="profile-pic-comment">

                        </div>
                        <div>
                            <textarea
                                id="textarea"
                                type='text'
                                name='comment-box'
                                onChange={updateComment}
                                value={comment}
                                onFocus={showOptions}
                                placeholder="Add a comment..."
                                maxLength='1000'
                                >
                            </textarea>
                                <div className="comment-length-counter">{`${comment?.length}/1000`}</div>
                            { focused ?
                                <span>
                                    <button onClick={hideOptions}>Cancel</button>
                                    <button className={`${commentSubmit}`} onClick={handleCommentSubmit}>Comment</button>
                                </span>
                                :
                                null
                            }
                        </div>
                    </div>
                    <div className="video-comments">
                        {comments.reverse().map(comment => (
                            <CommentCard key={comment.id} comment={comment}/>
                        ))}
                    </div>
                </div>

                <div className="recommended-videos">
                    {videos.map(video => {
                        if (video.id !== +videoId) {
                            return <NavLink key={video.id} to={`/videos/${video.id}`}>
                                <div  className="recommended-videos-card">
                                    <video src={`${video.videoUrl}#t=1`}
                                        preload="metadata"
                                        muted
                                        onMouseOver={event => event.target.play()}
                                        onMouseOut={event => event.target.pause()} />
                                    <div className="recommended-videos-info">
                                         <p>{video.title}</p>
                                         <p>{video.user.username}</p>
                                         <span>{viewsConverter(video.totalViews)} &#x2022; {dateConverter(video.createdAt)}</span>
                                    </div>
                                </div>
                            </NavLink>
                        }
                        return null
                    }
                    )}
                </div>
            </div>
        </>
    )
}


export default VideoDetails
