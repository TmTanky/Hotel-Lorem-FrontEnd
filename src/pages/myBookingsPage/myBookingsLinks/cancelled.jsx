import React from 'react'
import { useMutation } from '@apollo/client'

import { Button } from '@material-ui/core'

import { REMOVE_ROOM } from '../../../graphql/mutation/mutations'

const Cancelled = ({rooms}) => {

    const [removeTheRoom] = useMutation(REMOVE_ROOM)
    const filteredRoom = rooms.filter(item => item.isCancelled === true)

    const removeRoom = (id) => {
        removeTheRoom({
            variables: {
                roomID: id
            }
        })
    }

    const cancelledRooms = filteredRoom.map(item => {
        return <div className="mybooking" key={item._id} >
                    <h1 style={{marginBottom: '1rem'}} > {item.theBookedRoom[0].name} </h1>
                    <p> Status: <strong> {item.isCancelled ? 'Cancelled' : "" } </strong> </p>
                    {item.isCancelled ? <Button color="primary" variant="contained" style={{marginTop: '1rem'}} onClick={() => removeRoom(item._id) } > Remove </Button> : ""}
                </div>
    })
    
    return (
        <div>

            {/* {rooms ? rooms.map(item => {
                return <div key={item._id} className="mybooking" >
                    {item.isCancelled ? <h1 style={{marginBottom: '1rem'}} > {item.theBookedRoom[0].name} </h1> : null }
                    {item.isCancelled ? <p> Status: <strong> Cancelled </strong> </p> : "" } 
                    {item.isCancelled ? <Button color="primary" variant="contained" style={{marginTop: '1rem'}} > Remove </Button> : ""}
                </div>
            }): <h2 style={{paddingTop: '5rem', textAlign: 'center'}}> You have no bookings, book now </h2> } */}

        {rooms ? cancelledRooms : <h2 style={{paddingTop: '5rem', textAlign: 'center'}}> You have no bookings, book now </h2> }

        </div>
    )
}

export default Cancelled