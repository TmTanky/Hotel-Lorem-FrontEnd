import React from 'react'

import { Button } from '@material-ui/core'
// import StarRateIcon from '@material-ui/icons/StarRate';

// CSS
import './roomCard-styles.css'

const RoomCard = ({room, bookRoom}) => {

    const ratingArr = []
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    room.rating.map(rate => {
        return ratingArr.push(rate.rating) 
    })

    const totalRating = ratingArr.reduce(reducer, 0) / room.rating.length ? ratingArr.reduce(reducer, 0) / room.rating.length : 'No reviews'

    return <div className="roomcard">
        <img src="https://image.freepik.com/free-photo/modern-studio-apartment-design-with-bedroom-living-space_1262-12375.jpg" style={{width: '100%'}} alt=""/>
        <h3> {room.name} </h3> 
        <p> Ratings: <strong> {isNaN(totalRating) ? 'No reviews' : totalRating.toString().substring(0,3) } </strong> </p>
        <Button onClick={() => bookRoom(room._id)} color="primary" style={{marginTop: '2rem'}} variant="contained"> Details </Button>
    </div>
}

export default RoomCard