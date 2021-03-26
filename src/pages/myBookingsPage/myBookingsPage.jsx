import React from 'react'
import {useSelector} from 'react-redux'
import {Button} from '@material-ui/core'

// CSS
import './myBookings-styles.css'

const MyBookingsPage = () => {

    const userBookedRooms = useSelector(state => state.user.user.roomsBooked)

    const date2 = new Date().toLocaleDateString()

    const markAsDone = (id) => {
        console.log(id)
    }

    return (
        <div className="mybookingsbox">
            <h1 style={{textAlign: 'center', padding: '3rem'}} > My Bookings </h1>
            {userBookedRooms ? userBookedRooms.map(item => {
                return <div key={item._id} className="mybooking" >
                    <h1 style={{marginBottom: '1rem'}} > {item.theBookedRoom[0].name} </h1>
                    <p> ${item.theBookedRoom[0].price} </p>
                    <p> Status: <strong> {Math.floor(( Date.parse(item.bookAt) - Date.parse(date2) ) / 86400000) <= 0 ? 'Done' : `${Math.floor(( Date.parse(item.bookAt) - Date.parse(date2) ) / 86400000)} ${Math.floor(( Date.parse(item.bookAt) - Date.parse(date2) ) / 86400000) <= 1 ? 'day' : 'days'} remaining` } </strong> </p>
                    {Math.floor(( Date.parse(item.bookAt) - Date.parse(date2) ) / 86400000) <= 0 ? <Button color="primary" style={{marginTop: '1rem'}} variant="contained" > Mark as Done </Button> : <Button color="primary" style={{marginTop: '1rem'}} variant="contained" > Cancel </Button> }
                </div>
            }): <h2 style={{paddingTop: '5rem', textAlign: 'center'}}> You have no bookings, book now </h2> }
        </div>
    )
}

export default MyBookingsPage