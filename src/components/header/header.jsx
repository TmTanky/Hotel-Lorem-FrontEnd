import React from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

// Redux
import { logoutUser, logoutSuccess } from '../../redux/actions/actions'

// CSS
import './header-styles.css'

const Header = () => {

    const isUserLoggedIn = useSelector(state => state.isLoggedIn)
    const dispatch = useDispatch()

    return (
        <nav>
            <div className="navlogo">
                <h1> Hotel-Lorem </h1>
            </div>

            <div className="navlinks">
                <Link to="/"> Home </Link>
                <Link to="/"> About  </Link>
                {isUserLoggedIn ? <Link to="#" onClick={() => {
                    dispatch(logoutSuccess())
                    dispatch(logoutUser())
                }} > Logout </Link> : <Link to="/login"> Login </Link> }
            </div>
        </nav>
    )
}

export default Header