import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Modal } from "../../context/Modal"
import { getUserVideos, getUserSubscribedVideos } from "../../store/videos"
import { dateConverter, viewsConverter } from "../../store/helper"
import SideBar from "../Sidebar/SideBar"
import NavBar from "../Navigation/NavBar"
import EditVideo from "../EditVideo"
import DeleteVideo from "../DeleteVideo"
import "./profilepage.css"
import CreateVideo from "../CreateVideo"


const ProfilePage = () => {

    const dispatch = useDispatch()


    const user = useSelector(state => state.session.user)
    const videos = useSelector(state => Object.values(state.videos.videos))

    const [editting, setEditting] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [creating, setCreating] = useState(false)
    const [home, setHome] = useState(true)
    const [videoFocus, setVideoFocus] = useState('')

    useEffect(() => {
        dispatch(getUserVideos(user.id))
    }, [dispatch, user.id])

    const handleVideoEditClick = (e) => {
        e.preventDefault()
        setVideoFocus(e.target.value)
        setEditting(true)

    }

    const handleVideoDeleteClick = (e) => {
        e.preventDefault()
        setVideoFocus(e.target.value)
        setDeleting(true)

    }

    const handleVideoUploadClick = (e) => {
        e.preventDefault()
        setCreating(true)
    }

    const handleProfileHomeClick = (e) => {
        e.preventDefault()
        dispatch(getUserVideos(user.id))
        setHome(true)
    }

    const handleProfileChannelClick = (e) => {
        e.preventDefault()
        dispatch(getUserSubscribedVideos(user.id))
        setHome(false)
    }

    return (
        <div className="profile-page-main">
            <NavBar />
            <SideBar />
            <div className="profile-page-top">
                <div></div>
                <div className="profile-page-userinfo">
                    <div>{user.firstName} {user.lastName}</div>
                    <div>{`@${user.username}`}</div>
                    <div>{user.subscribers} subscribers</div>
                    <button className="upload-videos" onClick={handleVideoUploadClick}>Upload Videos</button>
                </div>
            </div>
            <div className="profile-page-options">
                <span onClick={handleProfileHomeClick}>Home</span>
                <span onClick={handleProfileChannelClick}>Channels</span>
            </div>
            <div className="my-video-container">
                {videos.map(video => (
                    <div className="my-video-card-container">
                        <div className="my-video-card-top">
                            <NavLink to={`/videos/${video.id}`}>
                                <div className="my-video-card" key={video.id}>
                                    <video>
                                        <source src={video.videoUrl} type="video/mp4" />
                                    </video>
                                    <div className="my-video-card-info">
                                        <div className="my-video-card-info-left">
                                            <p>{video.title}</p>
                                            <span>{viewsConverter(video.totalViews)}</span>
                                            <span>{dateConverter(video.createdAt)}</span>
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                        <div className="my-video-card-bottom">
                        {
                            home ?
                            <div>
                                <button value={video.id} onClick={handleVideoEditClick}>Edit</button>
                                <button value={video.id} onClick={handleVideoDeleteClick}>Delete</button>
                            </div>
                            :
                            null
                        }
                        </div>
                        {
                            editting && +videoFocus === +video.id &&
                            <Modal onClose={() => setEditting(false)}>
                                <EditVideo setEditting={setEditting} video={video}/>
                            </Modal>
                        }
                        {
                            deleting && +videoFocus === +video.id &&
                            <Modal onClose={() => setDeleting(false)}>
                                <DeleteVideo setDeleting={setDeleting} id={video.id}/>
                            </Modal>
                        }

                    </div>
                    ))}
            </div>
            {
                creating &&
                <Modal onClose={() => setCreating(false)}>
                    <CreateVideo setCreating={setCreating}/>
                </Modal>
            }
        </div>
    )
}


export default ProfilePage
