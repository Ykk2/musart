import React, {useState, useEffect} from 'react'
// import { useHistory } from 'react-router-dom'
import { postVideo } from '../../store/videos'
import { useDispatch } from 'react-redux'
import './createvideo.css'

const CreateVideo = ({setCreating}) => {

    // const history = useHistory()
    const dispatch = useDispatch()

    const [video, setVideo] = useState(null)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [previewVideo, setPreviewVideo] = useState(null)
    const [fileType, setFileType] = useState('')
    const [titleError, setTitleError] = useState('')
    const [descriptionError, setDescriptionError] = useState('')
    const [videoError, setVideoError] = useState('')
    const [showError, setShowError] = useState('')
    const [loading, setLoading] = useState(false)

    const updateVideo = (e) => {
        const file = e.target.files[0];
        setVideo(file)
        setFileType(file?.name)
        setPreviewVideo(URL.createObjectURL(file))
    }

    const updateTitle = (e) => {
        setTitle(e.target.value)
    }

    const updateDescription = (e) => {
        setDescription(e.target.value)
    }

    useEffect(() => {
        if (title.length > 255) setTitleError("255/255 max character limit reached")
        if (title.length > 0 && title.length < 255) setTitleError('')
        if (title.length <= 0) setTitleError("Title is required")
        if (description.length > 255) setDescriptionError("255/255 max character limit reached")
        if (description.length > 0 && description.length < 255) setDescriptionError('')
        if (description.length <= 0) setDescriptionError("Description is required")
        if (video == null) setVideoError("Video is required")
        if (video !== null) setVideoError(null)
        if (fileType && fileType.slice(-3).toLowerCase() !== "mp4") setVideoError("Only mp4 files are allowed")
    }, [title, description, video, fileType])


    const handleVideoSubmitClick = (e) => {
        e.preventDefault()
        setShowError(true)
        if (!titleError && !descriptionError && !videoError) {
            setLoading(true)
            const data = new FormData()
            data.append("title", title)
            data.append("description", description)
            data.append("video", video)
            dispatch(postVideo(data))
            .then((e) => {
                setShowError(false)
                setCreating(false)
                setLoading(false)
            })
        }
    }

    return (

        <form className="create-video-form" onSubmit={handleVideoSubmitClick}>
            {
                loading ?
                <div>
                    <img className="video-upload-loading" src={require('../../assets/images/Spinner.gif').default}></img>
                </div>
                :
                <div className="monkey">
                    <div className="video-upload-video">
                        <label>Video</label>
                        <video src={ previewVideo ? previewVideo : null} controls />
                        <div className="upload-video-error">{showError && videoError? videoError : null}</div>
                        <label>
                            Select File
                            <input
                                type='file'
                                accept='video/mp4'
                                onChange={updateVideo}
                            />
                        </label>
                        <div>video must be mp4 format</div>
                    </div>
                    <div className="video-upload-details">
                        <div>Details</div>
                        <label>{`Title (required)`}</label>
                        <textarea
                            type='text'
                            name='title'
                            onChange={updateTitle}
                            value={title}
                            placeholder="Add a title that describes your video"
                            maxLength='255'
                            />
                        <div className="upload-title-error">{showError && titleError? titleError : null}</div>
                        <div className="upload-title-counter">{`${title.length}/255`}</div>
                        <label>{`Description (required)`}</label>
                        <textarea
                            type='text'
                            name='title'
                            onChange={updateDescription}
                            value={description}
                            placeholder="Tell viewers about your video"
                            maxLength='255'
                            />
                        <div className="upload-description-error">{showError && descriptionError ? descriptionError : null}</div>
                        <div className="upload-description-counter">{`${description.length}/255`}</div>
                        <button type="submit">Upload</button>
                    </div>
                </div>
            }
        </form>

    )
}

export default CreateVideo
