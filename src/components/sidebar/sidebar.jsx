import React from 'react'
import {Link} from 'react-router-dom'

import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import Slide from '@material-ui/core/Slide';

// CSS
import './sidebar-styles.css'

const SideBar = ({trigger, close, user}) => {

    const {firstName, lastName} = user

    return <Slide direction="left" in={trigger} mountOnEnter unmountOnExit>
        <div className="sidebar" >
                <CloseIcon onClick={close} style={{margin: '1rem'}} />
        
                <div className="profile">
                    <h1> {firstName} {lastName} </h1>
                </div>
        
                <div className="profilelinks">
                    <Link to="#"> Edit Profile </Link>
                        <Divider />
                    <Link to="/mybookings"> My Bookings </Link>
                        <Divider />
                    <Link to="#"> Settings </Link>
                </div>
            </div> 
        </Slide>
}

export default SideBar

