
import { useDispatch, useSelector } from "react-redux"
import { deleteVideo } from "../../store/videos"
import { getUserVideos } from "../../store/videos"


const DeleteVideo = ({setDeleting, id}) => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)

    const deleteVideoConfirm = (e) => {
        e.preventDefault()
        dispatch(deleteVideo(id))
        dispatch(getUserVideos(user.id))
        setDeleting(false)
    }

    const cancelDelete = (e) => {
        e.preventDefault()
        setDeleting(false)
    }

    return (
        <>
        <div>Click Yes to confirm delete</div>
        <div>
            <button onClick={deleteVideoConfirm}>Yes</button>
            <button onClick={cancelDelete}>Cancel</button>
        </div>
        </>
    )
}

export default DeleteVideo
