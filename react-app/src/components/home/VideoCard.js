import { useState, useRef, useEffect } from "react"
import { NavLink } from "react-router-dom";
import { dateConverter, viewsConverter } from "../../store/helper";
import './home.css'


const VideoCard = ({video}) => {


    const vidRef = useRef(null)

    const [timerId, setTimerId] = useState()
    const [focus, setFocus] = useState(false)
    const [hovering, setHovering] = useState(false)
    // const [duration, setDuration] = useState(null)
    const [ready, setReady] = useState(false)

    // const [mins, setMins] = useState('NaN')
    // const [sec, setSec] = useState('NaN')

    // const minutes = parseInt(vidRef?.current?.duration / 60, 10)
    // const seconds = Math.trunc(vidRef?.current?.duration % 60)
    // console.log(vidRef)

    // while (vidRef == null) {
    //     const minutes = parseInt(vidRef?.current?.duration / 60, 10)
    //     const seconds = Math.trunc(vidRef?.current?.duration % 60)
    //     setMins(minutes)
    //     setSec(seconds)
    //     console.log()
    // }

    // useEffect(() => {
    //     while (!vidRef) {
    //         const minutes = parseInt(vidRef?.current?.duration / 60, 10)
    //         const seconds = Math.trunc(vidRef?.current?.duration % 60)
    //         setMins(minutes)
    //         setSec(seconds)
    //     }
    // }, [mins, sec, vidRef])

    const controlPreview = (e) => {
        e.preventDefault()
        e.stopPropagation()

        setHovering(true)

        const timer = setTimeout(() => {
                                         e.target.play()
                                         setFocus(true)
                                         setHovering(false)
                                         vidRef?.current?.setAttribute("controls", true)
                                          }, 2000)

        setTimerId(timer)
    }

    const mouseOut = (e) => {
        vidRef?.current.pause()
        vidRef?.current.removeAttribute("controls")
        clearTimeout(timerId)
        setTimerId(false)
        setFocus(false)
        setHovering(false)
    }


    return  (
            <NavLink id={`video${video.id}`} to={`/videos/${video.id}`} onClick={mouseOut}>
                <div className={ focus ? "video-card-preview" : "video-card"} onMouseLeave={mouseOut} key={video.id}>
                    <video
                        // poster={video.previewImage}
                        preload="metadata"
                        muted={true}
                        ref={vidRef}
                        onMouseOver={event => controlPreview(event)}
                    >
                        <source src={`${video.videoUrl}#t=1`} type="video/mp4" />
                    </video>
                    {
                        hovering ?
                        <span id="preview-hover-text">Keep hovering to play</span>
                        :
                        ready ?
                        // <span id="preview-hover-text">{minutes}:{seconds}</span>
                        null
                        :
                        null
                    }
                    <div className="video-card-info">
                        <div id="video-card-info-left">

                        </div>
                        <div id="video-card-info-right">
                            <p>{video.title}</p>
                            <p>{video.user.username}</p>
                            <span>{viewsConverter(video.totalViews)} {dateConverter(video.createdAt)}</span>
                        </div>
                    </div>
                </div>
            </NavLink>
    )
}

export default VideoCard
