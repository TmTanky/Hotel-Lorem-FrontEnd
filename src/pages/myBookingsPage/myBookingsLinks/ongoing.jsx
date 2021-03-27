import React from 'react'
import {useMutation} from '@apollo/client'

import { Button } from '@material-ui/core'
import { CANCEL_ROOM, MARK_AS_DONE } from '../../../graphql/mutation/mutations'

const Ongoing = ({rooms}) => {

    const [cancelRoom] = useMutation(CANCEL_ROOM)
    const [markAsDone, {error}] = useMutation(MARK_AS_DONE)

    if (error) {
        console.log(error.message)
    }

    const currentDate = new Date().toLocaleDateString()

    const markAsDoneRoom = (id) => {
        markAsDone({
            variables: {
                roomID: id
            }
        })
    }

    const cancelBooking = (id) => {
        cancelRoom({
            variables: {
                roomID: id
            }
        })
    }

    return (
        <div>

            {rooms ? rooms.map(item => {
                return <div key={item._id} className="mybooking" >
                    <h1 style={{marginBottom: '1rem'}} > {item.theBookedRoom[0].name} </h1>
                    <p> ${item.theBookedRoom[0].price} </p>
                    <p> Status: <strong> {Math.floor(( Date.parse(item.bookAt) - Date.parse(currentDate) ) / 86400000) <= 0 ? 'Done' : `${Math.floor(( Date.parse(item.bookAt) - Date.parse(currentDate) ) / 86400000)} ${Math.floor(( Date.parse(item.bookAt) - Date.parse(currentDate) ) / 86400000) <= 1 ? 'day' : 'days'} remaining` } </strong> </p>
                    {Math.floor(( Date.parse(item.bookAt) - Date.parse(currentDate) ) / 86400000) <= 0 ? item.isDone || item.isCancelled ? "" : <Button color="primary" style={{marginTop: '1rem'}} variant="contained" onClick={() => markAsDoneRoom(item._id) } > Mark as Done </Button>  : item.isDone || item.isCancelled ? "" : <Button color="primary" style={{marginTop: '1rem'}} variant="contained" onClick={() => cancelBooking(item._id) }  > Cancel </Button>}

                    { item.isDone ? <p> Status: <strong> Done </strong> </p> : <p> Status: <strong> Cancelled </strong> </p> }

                </div>
            }): <h2 style={{paddingTop: '5rem', textAlign: 'center'}}> You have no bookings, book now </h2> }

        </div>
    )
}

export default Ongoing