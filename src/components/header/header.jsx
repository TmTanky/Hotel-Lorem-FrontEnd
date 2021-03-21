import React from 'react'
import {Link} from 'react-router-dom'

// CSS
import './header-styles.css'

const Header = () => {
    return (
        <nav>
            <div className="navlogo">
                <h1> Hotel-Lorem </h1>
            </div>

            <div className="navlinks">
                <Link to="/"> Home </Link>
                <Link to="/"> About  </Link>
                <Link to="/login"> Login </Link>
            </div>
        </nav>
    )
}

export default Header