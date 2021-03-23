import React, {useEffect, useState} from 'react'
import {useQuery} from '@apollo/client'
import {useRouteMatch} from 'react-router-dom'

import { Button } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
import { ALL_ROOMS } from '../../graphql/query/queries';


// CSS
import './oneRoom-styles.css'

const OneRoomPage = () => {

    const urlParams = useRouteMatch()

    const { loading, error, data } = useQuery(ALL_ROOMS)
    const [rooms, setRooms] = useState({
        data: []
    })

    useEffect(() => {
        if (data) {
            setRooms({
                data: data.allRooms
            })

        }
    }, [data])

    if (error) {
        console.log(error)
    }

    const theRoom = rooms.data.filter(room => room._id === urlParams.params.id)
    console.log(theRoom)

    return (
        <div className="oneroombox">
            {loading ? <CircularProgress /> : theRoom.map(room => {
                return <div key={room._id} className="oneroomcard" >
                    <img src="https://image.freepik.com/free-photo/modern-studio-apartment-design-with-bedroom-living-space_1262-12375.jpg" style={{width: '50vw', margin: '2rem auto 2rem auto'}} alt=""/>
                    <h1> {room.name} </h1>
                    <p> Type: {room.type} </p>
                    <p> Price: ${room.price} </p>
                    <p> Max Persons: {room.maxPersons} </p>
                    <p style={{marginTop: '1rem'}} > <strong> "{room.description}" </strong> </p>
                    <Button variant="contained" color="primary" style={{marginTop: '1rem', width: '100px'}} > Book </Button>
                </div>
            })}
        </div>
    )
}

export default OneRoomPage