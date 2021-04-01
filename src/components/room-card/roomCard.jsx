import React from 'react'

import { Button } from '@material-ui/core'
import StarRateIcon from '@material-ui/icons/StarRate';

// CSS
import './roomCard-styles.css'

const RoomCard = ({room, bookRoom}) => {
    return <div className="roomcard">
        <img src="https://image.freepik.com/free-photo/modern-studio-apartment-design-with-bedroom-living-space_1262-12375.jpg" style={{width: '100%'}} alt=""/>
        <h3> {room.name} </h3> 
        <p> <StarRateIcon style={{margin: 'auto'}} /> <StarRateIcon style={{margin: 'auto'}} /> <StarRateIcon style={{margin: 'auto'}} /> <StarRateIcon style={{margin: 'auto'}} /> <StarRateIcon style={{margin: 'auto'}} /> </p>
        <Button onClick={() => bookRoom(room._id)} color="primary" style={{marginTop: '2rem'}} variant="contained"> Details </Button>
    </div>
}

export default RoomCard