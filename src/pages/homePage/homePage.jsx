import React, {useState, useEffect} from 'react'
import {useQuery} from '@apollo/client'
import {useHistory} from 'react-router-dom'

import CircularProgress from '@material-ui/core/CircularProgress';

// GraphQL
import { ALL_ROOMS } from '../../graphql/query/queries'

// Components
import RoomCard from '../../components/room-card/roomCard'

// CSS
import './homePage-styles.css'

const RoomPage = () => {
    
    const history = useHistory()
    const token = localStorage.getItem('token')
    
    const { loading, data } = useQuery(ALL_ROOMS, {
        context: {
            headers: {
                'auth': `Bearer ${token}`
            }
        }
    })

    // if (error) {
    //     console.log(error)
    // }

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

    const bookRoom = (id) => {
        history.push(`/rooms/${id}`)
    }

    return (
        <main className="main4">
            {loading ? <CircularProgress /> : rooms.data.length === 0 ? loading : rooms.data.map(room => {
                return <div key={room._id} className="roombox">
                    <RoomCard room={room} bookRoom={bookRoom} />
                </div>
            }) }
        </main>
    )
}

export default RoomPage