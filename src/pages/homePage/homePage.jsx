import React, {useState, useEffect} from 'react'
import {useQuery} from '@apollo/client'
import {useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'

import CircularProgress from '@material-ui/core/CircularProgress';

// GraphQL
import { ALL_ROOMS } from '../../graphql/query/queries'

// Redux
import { loadRooms } from '../../redux/actions/actions'

// Components
import RoomCard from '../../components/room-card/roomCard'

// CSS
import './homePage-styles.css'

const RoomPage = () => {
    
    const history = useHistory()
    const dispatch = useDispatch()
    const rooms = useSelector(state => state.allRooms.data.allRooms)
    const { loading, data } = useQuery(ALL_ROOMS)

    useEffect(() => {
        if (data) {
            dispatch(loadRooms(data))
        }
    }, [data, dispatch])

    const bookRoom = (id) => {
        history.push(`/rooms/${id}`)
    }

    return (
        <main className="main4">
            {loading ? <CircularProgress /> : rooms.length === 0 ? loading : rooms.map(room => {
                return <div key={room._id} className="roombox">
                    <RoomCard room={room} bookRoom={bookRoom} />
                </div>
            }) }
        </main>
    )
}

export default RoomPage