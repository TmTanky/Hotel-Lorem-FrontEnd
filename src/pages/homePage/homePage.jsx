import React, {useEffect} from 'react'
import {useQuery} from '@apollo/client'
import {useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'

import CircularProgress from '@material-ui/core/CircularProgress';

// GraphQL
import { ALL_ROOMS, USER_INFO } from '../../graphql/query/queries'

// Redux
import { loadRooms, loadTheUser } from '../../redux/actions/actions'

// Components
import RoomCard from '../../components/room-card/roomCard'

// CSS
import './homePage-styles.css'

const RoomPage = () => {
    
    const history = useHistory()
    const dispatch = useDispatch()
    const currentUserID = useSelector(state => state.user.user.userID)
    const rooms = useSelector(state => state.allRooms.data.allRooms)
    const { loading, data } = useQuery(ALL_ROOMS)
    const { loading: loading2, data: data2 } = useQuery(USER_INFO, {
        variables: {
            userID: currentUserID
        }
    })

    useEffect(() => {
        if (loading === false && data){
            dispatch(loadRooms(data));
        }
    }, [loading, data, dispatch])

    useEffect(() => {
        if (loading2 === false && data2){
            dispatch(loadTheUser(data2));
        }
    }, [loading2, data2, dispatch])

    // useEffect(() => {
    //     if (data && datatae ) {
    //         dispatch(loadRooms(data))
    //         dispatch(loadTheUser(datatae))
    //     }
    // }, [data, dispatch, datatae])
    
    const bookRoom = (id) => {
        history.push(`/rooms/${id}`)
    }

    const isLoadDone = loading2 === false && data2 && loading === false && data ? <main className="main4">
        {loading === false && data && loading2 === false && data2 ? rooms.map(room => {
            return <div key={room._id} className="roombox">
                <RoomCard room={room} bookRoom={bookRoom} />
            </div>
        }) : <CircularProgress/> }
    </main> : ""

    return (
        <main className="main4">
            {loading === false && data && loading2 === false && data2 ? isLoadDone : <CircularProgress/> }
        </main>
    )
}

export default RoomPage