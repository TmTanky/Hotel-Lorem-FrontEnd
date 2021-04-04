import React, {useState, useEffect} from 'react'
import { useMutation, useQuery } from '@apollo/client'
import {useSelector, useDispatch} from 'react-redux'

// GraphQL
import { RATE_ROOM } from '../../../graphql/mutation/mutations'
import { USER_INFO } from '../../../graphql/query/queries'

// Redux 
import { loadTheUser } from '../../../redux/actions/actions'

import { Button } from '@material-ui/core'
// import Zoom from '@material-ui/core/Zoom';
// import CloseIcon from '@material-ui/icons/Close'
// import Alert from '@material-ui/lab/Alert';
// import IconButton from '@material-ui/core/IconButton';
// import Collapse from '@material-ui/core/Collapse';

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
    
    // const reviewSubmit = (e, roomID) => {
    //     e.preventDefault()

    //     if (review.data.length >= 2 ) {
    //         return setSubmitError({
    //             error: [{ msg: "Input must be 1 character." }]
    //         })
    //     }

    //     if (review.data >= 6 || review.data <= 0) {
    //         return setSubmitError({
    //             error: [{ msg: "Review must be 1 - 5." }]
    //         })
    //     }

    //     // rateTheRoom({
    //     //     variables: {
    //     //         userID:
    //     //     }
    //     // })

    //     // setReview({ data: "" })
    //     // setSubmitError({
    //     //     error: []
    //     // })
    //     // setOpen(true)
        
    // }

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
                        // console.log(filteredRoom.filter(tae => tae._id === item._id)[0]._id)
                        setChecked2(true)
                    }} > Edit Rating </Button>
                </div>}

                <PopUpRate roomers={roomers} checked={checked} pota={filteredRoom.filter(tae => tae._id === item._id)[0]._id} rooms={rooms} open={open} rateTheRoom={rateTheRoom} userID={userID} setOpen={setOpen} setChecked={setChecked} setReview={setReview} setSubmitError={setSubmitError} submitError={submitError} review={review} item={item} />
                <PopUpEditRate roomers2={roomers2} setRoomers2={setRoomers2} review2={review2} setReview2={setReview2} checked2={checked2} setChecked2={setChecked2} open2={open2} setOpen2={setOpen2} />

            </div>
    })

    // const cancelledRooms2 = currentUser.map(tae => {
    //     return filteredRoom.map(item => {
    //         return <div className="mybooking" key={item._id} >
    //         <h1 style={{marginBottom: '1rem'}} > {item.theBookedRoom[0].name} </h1>
    //         <p> Status: <strong> {item.isDone ? 'Done' : "" } </strong> </p>
    //         {item.isDone && item.isRated === false ? <Button color="primary" variant="contained" style={{marginTop: '1rem'}} onClick={() => {
    //             setChecked(true)
    //             setRoomers(filteredRoom.filter(tae => tae._id === item._id)[0]._id)
    //         }} > Rate Room </Button> : <div> 
    //             <Button color="primary" style={{marginTop: '1rem'}} variant="contained" disabled > Done </Button>
    //             <Button color="primary" style={{marginTop: '1rem', marginLeft: '0.5rem'}} variant="contained" onClick={() => {
    //                 // console.log(filteredRoom.filter(tae => tae._id === item._id)[0]._id)
    //                 console.log(item)
    //             }} > Edit Rating </Button>
    //         </div>}

    //         <PopUpRate roomers={roomers} checked={checked} pota={filteredRoom.filter(tae => tae._id === item._id)[0]._id} rooms={rooms} open={open} rateTheRoom={rateTheRoom} userID={userID} setOpen={setOpen} setChecked={setChecked} setReview={setReview} setSubmitError={setSubmitError} submitError={submitError} review={review} item={item} />
    //         <PopUpEditRate />

    //     </div>
    //     })
    // })

    // console.log(cancelledRooms2)

    return (
        <div>

            {rooms ? cancelledRooms : <h2 style={{paddingTop: '5rem', textAlign: 'center'}}> You have no bookings, book now </h2> }

        </div>
    )
}

export default Done

// return <p> {rate.rating} </p>