import React, {useState, useEffect} from 'react'
import { useMutation, useQuery } from '@apollo/client'
import {useSelector, useDispatch} from 'react-redux'

// GraphQL
import { RATE_ROOM, EDIT_RATE } from '../../../graphql/mutation/mutations'
import { USER_INFO } from '../../../graphql/query/queries'

// Redux 
import { loadTheUser } from '../../../redux/actions/actions'

import { Button } from '@material-ui/core'

// Components
import PopUpRate from '../../../components/popupRate/popupRate'
import PopUpEditRate from '../../../components/popupEditRate/popupEditRate'

const Done = ({rooms}) => {

    // const currentUser = useSelector(state => state.userInfo.user.userInfo.roomsRated)

    const userID = useSelector(state => state.user.user.userID)

    const [roomers, setRoomers] = useState("")
    const [review, setReview] = useState({
        data: ""
    })
    const [checked, setChecked] = useState(false)
    const [open, setOpen] = useState(false)
    const [submitError, setSubmitError] = useState({
        error: []
    })

    const [roomers2, setRoomers2] = useState("")
    const [review2, setReview2] = useState({
        data2: ""
    })
    const [checked2, setChecked2] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [submitError2, setSubmitError2] = useState({
        error2: []
    })

    const filteredRoom = rooms.user.userInfo.roomsBooked.filter(item => item.isDone === true)
    
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

    const [rateTheRoom] = useMutation(RATE_ROOM, {
        onCompleted: async () => {
            setReview({ data: "" })
            setSubmitError({
                error: []
            })
            setOpen(true)
            refetch()
        },
        onError: (error) => {
            console.log(error)
            console.log(error.message)
        }
    })

    const [editTheRate] = useMutation(EDIT_RATE, {
        onCompleted: async () => {
            setReview2({ data2: "" })
            setOpen2(true)
            refetch()
        },
        onError: (error) => {
            console.log(error)
            console.log(error.message)
        }
    })

    const cancelledRooms = filteredRoom.map(item => {

        return <div className="mybooking" key={item._id} >
                <h1 style={{marginBottom: '1rem'}} > {item.theBookedRoom[0].name} </h1>
                <p> Status: <strong> {item.isDone ? 'Done' : "" } </strong> </p>
                {item.isRated ? <p> My Rating: {item.rating.rating} </p> : "" }
                {item.isDone && item.isRated === false ? <Button color="primary" variant="contained" style={{marginTop: '1rem'}} onClick={() => {
                    setChecked(true)
                    setRoomers(filteredRoom.filter(tae => tae._id === item._id)[0]._id)
                }} > Rate Room </Button> : <div> 
                    <Button color="primary" style={{marginTop: '1rem'}} variant="contained" disabled > Done </Button>
                    <Button color="primary" style={{marginTop: '1rem', marginLeft: '0.5rem'}} variant="contained" onClick={() => {
                        setChecked2(true)
                        setRoomers2(filteredRoom.filter(tae => tae._id === item._id)[0].rating._id)
                    }} > Edit Rating </Button>
                </div>}

                <PopUpRate roomers={roomers} checked={checked} pota={filteredRoom.filter(tae => tae._id === item._id)[0]._id} rooms={rooms} open={open} rateTheRoom={rateTheRoom} userID={userID} setOpen={setOpen} setChecked={setChecked} setReview={setReview} setSubmitError={setSubmitError} submitError={submitError} review={review} item={item} />
                <PopUpEditRate submitError2={submitError2} setSubmitError2={setSubmitError2} roomers2={roomers2} setRoomers2={setRoomers2} review2={review2} setReview2={setReview2} checked2={checked2} setChecked2={setChecked2} open2={open2} setOpen2={setOpen2} editTheRate={editTheRate} />

            </div>
    })

    return (
        <div>

            {rooms ? cancelledRooms : <h2 style={{paddingTop: '5rem', textAlign: 'center'}}> You have no bookings, book now </h2> }

        </div>
    )
}

export default Done
