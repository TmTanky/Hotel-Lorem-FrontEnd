import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import Slide from '@material-ui/core/Slide';
import Badge from '@material-ui/core/Badge';

// CSS
import './sidebar-styles.css'

const SideBar = ({trigger, close, user}) => {

    const userBookedRooms = useSelector(state => state.user.user.roomsBooked)

    const {firstName, lastName} = user

    return <Slide direction="left" in={trigger} mountOnEnter unmountOnExit>
        <div className="sidebar" >
                <CloseIcon onClick={close} style={{margin: '1rem'}} />
        
                <div className="profile">
                    <h1> {firstName} {lastName} </h1>
                </div>
        
                <div className="profilelinks">
                    <Link to="/myprofile"> My Profile </Link>
                        <Divider />
                    <Badge badgeContent={userBookedRooms ? userBookedRooms.length : ""} color="primary" >
                        <Link to="/mybookings/ongoing"> My Bookings </Link>
                    </Badge>
                        <Divider />
                </div>
            </div> 
        </Slide>
}

export default SideBar

