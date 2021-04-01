import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation, useQuery } from '@apollo/client'

import { Button } from '@material-ui/core'

// Redux
import { loadTheUser } from '../../../redux/actions/actions'

// GraphQL
import { REMOVE_ROOM, UNCANCEL_ROOM } from '../../../graphql/mutation/mutations'
import { USER_INFO } from '../../../graphql/query/queries'

const Cancelled = ({rooms}) => {

    const dispatch = useDispatch()
    const filteredRoom = rooms.user.userInfo.roomsBooked.filter(item => item.isCancelled === true)
    const currentUserID = useSelector(state => state.user.user.userID)

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

    const [removeTheRoom] = useMutation(REMOVE_ROOM)
    const [unCancelTheRoom] = useMutation(UNCANCEL_ROOM)

    const removeRoom = (id) => {
        removeTheRoom({
            variables: {
                roomID: id
            }
        })
        refetch((dataUser) => {
            dispatch(loadTheUser(dataUser))
        })
    }

    const unCancelRoom = (id) => {
        unCancelTheRoom({
            variables: {
                roomID: id
            }
        })
        refetch((dataUser) => {
            dispatch(loadTheUser(dataUser))
        })
    }

    const cancelledRooms = filteredRoom.map(item => {
        return <div className="mybooking" key={item._id} >
                    <h1 style={{marginBottom: '1rem'}} > {item.theBookedRoom[0].name} </h1>
                    <p> Status: <strong> {item.isCancelled ? 'Cancelled' : "" } </strong> </p>
                    {item.isCancelled ? <Button color="primary" variant="contained" style={{marginTop: '1rem'}} onClick={() => removeRoom(item._id) } > Remove </Button> : ""}
                    <Button color="primary" variant="contained" style={{marginTop: '1rem', marginLeft: '0.5rem'}} onClick={() => unCancelRoom(item._id) } > Rebook </Button>
                </div>
    })
    
    return (
        <div>

        {rooms ? cancelledRooms : <h2 style={{paddingTop: '5rem', textAlign: 'center'}}> You have no bookings, book now </h2> }

        </div>
    )
}

export default Cancelled