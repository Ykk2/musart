
import { useState, useEffect } from "react"
import { putVideo, getUserVideos } from "../../store/videos"
import { useDispatch } from "react-redux"
import '../EditVideo/editvideo.css'



const EditVideo = ({ setEditting, video }) => {

    const dispatch = useDispatch()

    const [title, setTitle] = useState(`${video.title}`)
    const [description, setDescription] = useState(`${video.description}`)
    const [titleError, setTitleError] = useState('')
    const [descriptionError, setDescriptionError] = useState('')
    const [showError, setShowError] = useState('')

    useEffect(() => {
        if (title.length >= 255) setTitleError("255/255 max character limit reached")
        if (title.length > 0 && title.length < 255) setTitleError('')
        if (title.length <= 0) setTitleError("Title is required")
        if (description.length >= 255) setDescriptionError("255/255 max character limit reached")
        if (description.length > 0 && description.length < 255) setDescriptionError('')
        if (description.length <= 0) setDescriptionError("Description is required")
    }, [title, description])


    const updateTitle = (e) => {
        setTitle(e.target.value);
    };

    const updateDescription = (e) => {
        setDescription(e.target.value)
    }

    const submitEditClick = (e) => {
        e.preventDefault()
        setShowError(true)
        if (!titleError && !descriptionError) {
            setShowError(false)
            setTitleError("")
            setDescriptionError("")
            const data = {title, description, "id": video.id}
            setEditting(false)
            dispatch(putVideo(data))
            .then(dispatch(getUserVideos(video.user.id)))

        }
    }

    return (
        <div className="video-form-editting">
            <div className="video-card-editting">
                <video controls>
                    <source src={video.videoUrl} type="video/mp4" />
                </video>
                <div>{title}</div>
                <div>{description}</div>
            </div>
            <form className="edit-video-form" onSubmit={submitEditClick}>
                <div>
                    <label>Title</label>
                    <textarea
                        type='text'
                        name='title'
                        onChange={updateTitle}
                        value={title}
                        maxLength="255"
                    ></textarea>
                    <div className="title-error">{showError && titleError? titleError : null}</div>
                    <div className="title-counter">{`${title.length}/255`}</div>
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        type='text'
                        name='description'
                        onChange={updateDescription}
                        value={description}
                        maxLength="255"
                    ></textarea>
                    <div className="description-error">{showError && descriptionError ? descriptionError : null}</div>
                    <div className="description-counter">{`${description.length}/255`}</div>
                </div>
                <button onClick={() => (setEditting(false))}>cancel</button>
                <button type='submit'>save</button>
            </form>
        </div>
    )
}

export default EditVideo
