import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

// Redux
import { logoutUser, logoutSuccess, unloadTheUser } from '../../redux/actions/actions'

// CSS
import './header-styles.css'
import SideBar from '../sidebar/sidebar'

const Header = () => {

    const history = useHistory()
    const isUserLoggedIn = useSelector(state => state.isLoggedIn)
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const roomLength = useSelector(state => state.userInfo)
    // roomLength.user.userInfo.roomsBooked.length
    // Object.keys(roomLength.user).length === 0

    const [profileSideBar, setProfileSideBar] = useState(false)

    const close = () => {
        setProfileSideBar(false)
    }

    return (
        <nav className="head" >
            <div className="navlogo">
                <h1 style={{cursor: 'pointer'}} onClick={() => history.push('/')} > Hotel-Lorem </h1>
            </div>

            <div className="navlinks">
                {/* <Link to="/"> Home </Link> */}
                {user.isAdmin ? <Link to="/admin/ongoing"> Admin </Link> : ""}
                {isUserLoggedIn ? <Link to="#" onClick={() => {
                    setProfileSideBar(true)
                }} > Profile </Link> : "" }
                {isUserLoggedIn ? <Link to="#" onClick={() => {
                    dispatch(logoutSuccess())
                    dispatch(logoutUser())
                    dispatch(unloadTheUser())
                    localStorage.removeItem('token')
                }} > Logout </Link> : <Link to="/login"> Login </Link> }
            </div>

            <SideBar trigger={profileSideBar} roomLength={roomLength} user={user} close={close} > </SideBar>

        </nav>
    )
}

export default Header