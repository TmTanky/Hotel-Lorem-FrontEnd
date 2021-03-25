import React from 'react'
import {useSelector} from 'react-redux'
import {Button} from '@material-ui/core'

// CSS
import './myBookings-styles.css'

const MyBookingsPage = () => {

    const userBookedRooms = useSelector(state => state.user.user.roomsBooked)

    const date2 = new Date().toLocaleDateString()
    const date1 = new Date('Mar 26 2021').toLocaleDateString()
    console.log(date2)
    console.log(date1)

    const diff =  Math.floor(( Date.parse(date1) - Date.parse(date2) ) / 86400000)
    console.log(diff)

    return (
        <div className="mybookingsbox">
            <h1 style={{textAlign: 'center', paddingTop: '4rem'}} > My Bookings </h1>
            {userBookedRooms ? userBookedRooms.map(item => {
                return <div key={item._id} className="mybooking" >
                    <h1 style={{marginBottom: '1rem'}} > {item.theBookedRoom[0].name} </h1>
                    <p> ${item.theBookedRoom[0].price} </p>
                    <p> Status: <strong> {Math.floor(( Date.parse(item.bookAt) - Date.parse(date2) ) / 86400000) === 0 ? 'Done' : `${Math.floor(( Date.parse(item.bookAt) - Date.parse(date2) ) / 86400000)} days remaining` } </strong> </p>
                    {Math.floor(( Date.parse(item.bookAt) - Date.parse(date2) ) / 86400000) === 0 ? <Button color="primary" style={{marginTop: '1rem'}} variant="contained" > Remove </Button> : <Button color="primary" style={{marginTop: '1rem'}} variant="contained" > Cancel </Button> }
                </div>
            }): ""}
        </div>
    )
}

export default MyBookingsPage