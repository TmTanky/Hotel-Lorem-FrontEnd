import React from 'react'

import { Button } from '@material-ui/core'

const Done = ({rooms}) => {

    const filteredRoom = rooms.user.userInfo.roomsBooked.filter(item => item.isDone === true)

    const cancelledRooms = filteredRoom.map(item => {
        return <div className="mybooking" key={item._id} >
                <h1 style={{marginBottom: '1rem'}} > {item.theBookedRoom[0].name} </h1>
                <p> Status: <strong> {item.isDone ? 'Done' : "" } </strong> </p>
                {item.isDone ? <Button color="primary" variant="contained" style={{marginTop: '1rem'}} > Rate Room </Button> : ""}
            </div>
    })

    return (
        <div>

            {rooms ? cancelledRooms : <h2 style={{paddingTop: '5rem', textAlign: 'center'}}> You have no bookings, book now </h2> }

        </div>
    )
}

export default Done