import { useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import './sidebar.css'


const SideBar = () => {

    const history = useHistory()

    const user = useSelector(state => state.session.user)

    const handleHomeClick = (e) => {
        e.preventDefault()
        history.push('/')
    }

    const handleYourVideoClick = (e) => {
        e.preventDefault()
        if (user) history.push(`/user/${user.username}`)
        else history.push('/login')
    }


    return (
        <div className="SideBar">

            <div className="SideBar-top">
                <div onClick={handleHomeClick}>
                    <i className="fa-solid fa-house"></i>
                    <div>Home</div>
                </div>
            </div>

            <div className="SideBar-middle">
                <div onClick={handleYourVideoClick}>
                    <i className="fa-solid fa-play"></i>
                    <div>Your Videos</div>
                </div>
            </div>
            <div >
                {/* <div className="SideBar-bottom">
                    <div>Subscriptions</div>
                    <div>
                    subscriptions container
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default SideBar
