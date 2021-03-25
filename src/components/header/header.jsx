import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

// Redux
import { logoutUser, logoutSuccess } from '../../redux/actions/actions'

// CSS
import './header-styles.css'
import SideBar from '../sidebar/sidebar'

const Header = () => {

    const isUserLoggedIn = useSelector(state => state.isLoggedIn)
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)

    const [profileSideBar, setProfileSideBar] = useState(false)

    const close = () => {
        setProfileSideBar(false)
    }

    return (
        <nav>
            <div className="navlogo">
                <h1> Hotel-Lorem </h1>
            </div>

            <div className="navlinks">
                <Link to="/"> Home </Link>
                <Link to="/"> About  </Link>
                {user.isAdmin ? <Link to="/"> Admin </Link> : ""}
                {isUserLoggedIn ? <Link to="#" onClick={() => {
                    setProfileSideBar(true)
                }} > Profile </Link> : "" }
                {isUserLoggedIn ? <Link to="#" onClick={() => {
                    dispatch(logoutSuccess())
                    dispatch(logoutUser())
                    localStorage.removeItem('token')
                }} > Logout </Link> : <Link to="/login"> Login </Link> }
            </div>

            <SideBar trigger={profileSideBar} user={user} close={close} > </SideBar>

        </nav>
    )
}

export default Header