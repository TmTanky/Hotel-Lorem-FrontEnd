import React, {useEffect} from 'react'
import {useMutation, useQuery} from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from '@material-ui/core'

// Redux
import { loadTheUser } from '../../../redux/actions/actions'

// GraphQL
import { CANCEL_ROOM, MARK_AS_DONE } from '../../../graphql/mutation/mutations'
import { USER_INFO } from '../../../graphql/query/queries'

const Ongoing = ({rooms}) => {

    const [cancelRoom] = useMutation(CANCEL_ROOM)
    const [markAsDone, {error}] = useMutation(MARK_AS_DONE)
    const currentUserID = useSelector(state => state.user.user.userID)
    const dispatch = useDispatch()
    const { data, refetch } = useQuery(USER_INFO, {
        variables: {
            userID: currentUserID
        }
    })

    useEffect(() => {
        if (data) {
            dispatch(loadTheUser(data))
        }
    },[data, dispatch])

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
        refetch()
    }

    const cancelBooking = (id) => {
        cancelRoom({
            variables: {
                roomID: id
            }
        })
        refetch()
    }

    return (
        <div>
            
            {rooms ? rooms.user.userInfo.roomsBooked.map(item => {
                return <div key={item._id} className="mybooking" >
                    <h1 style={{marginBottom: '1rem'}} > {item.theBookedRoom[0].name} </h1>
                    <p> ${item.theBookedRoom[0].price} </p>
                    <p> Status: {item.isCancelled ? <strong> Cancelled </strong> : <strong> {Math.floor(( Date.parse(item.bookAt) - Date.parse(currentDate) ) / 86400000) <= 0 ? 'Done' : `${Math.floor(( Date.parse(item.bookAt) - Date.parse(currentDate) ) / 86400000)} ${Math.floor(( Date.parse(item.bookAt) - Date.parse(currentDate) ) / 86400000) <= 1 ? 'day' : 'days'} remaining` } </strong> } </p>
                    {Math.floor(( +Date.parse(item.bookAt) - +Date.parse(currentDate) ) / 86400000) <= 0 ? item.isDone || item.isCancelled ? "" : <Button color="primary" style={{marginTop: '1rem'}} variant="contained" onClick={() => markAsDoneRoom(item._id) } > Mark as Done </Button>  : item.isDone || item.isCancelled ? "" : <Button color="primary" style={{marginTop: '1rem'}} variant="contained" onClick={() => cancelBooking(item._id) }  > Cancel </Button>}
                </div>
            }): <h2 style={{paddingTop: '5rem', textAlign: 'center'}}> You have no bookings, book now </h2> }

        </div>
    )
}

export default Ongoing