import React, {useState} from 'react'
import { useMutation } from '@apollo/client'
import {useSelector} from 'react-redux'

// GraphQL
import { RATE_ROOM } from '../../../graphql/mutation/mutations'

import { Button } from '@material-ui/core'
import Zoom from '@material-ui/core/Zoom';
import CloseIcon from '@material-ui/icons/Close'
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';

const Done = ({rooms}) => {

    const userID = useSelector(state => state.user.user.userID)
    const [review, setReview] = useState({
        data: ""
    })
    const [checked, setChecked] = useState(false)
    const [open, setOpen] = useState(false)
    const [submitError, setSubmitError] = useState({
        error: []
    })
    const filteredRoom = rooms.user.userInfo.roomsBooked.filter(item => item.isDone === true)

    const [rateTheRoom] = useMutation(RATE_ROOM, {
        onCompleted: async () => {
            setReview({ data: "" })
            setSubmitError({
                error: []
            })
            setOpen(true)
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
                {/* {console.log(item)} */}
                <h1 style={{marginBottom: '1rem'}} > {item.theBookedRoom[0].name} </h1>
                <p> Status: <strong> {item.isDone ? 'Done' : "" } </strong> </p>
                {item.isDone ? <Button color="primary" variant="contained" style={{marginTop: '1rem'}} onClick={() => {
                    setChecked(true)
                }} > Rate Room </Button> : ""}

                <Zoom in={checked}>
                    <div className="ratebox">

                    <Collapse in={open} className="submitdone" >
                        <Alert
                        action={
                            <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                            >
                            <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        >
                        Review Submitted!
                        </Alert>
                    </Collapse>

                        <div className="submitclose">
                            <CloseIcon onClick={() => {
                                setChecked(false)
                                setReview({ data: "" })
                                setSubmitError({
                                    error: []
                                })
                            }} />
                        </div>

                        <form>
                            <h1 style={{margin: '0.5rem', fontSize: '2.5rem'}} > Submit a review </h1>
                            {submitError.error.length > 0 ? submitError.error.map(item => {
                                return <p key={item.msg} style={{color: 'red', fontSize: '0.8rem', margin: '0.3rem 0rem'}} > {item.msg} </p>
                            }) : ""}
                            <input className="submitreview" value={review.data} type="number" min="1" onChange={(e) => setReview({ data: e.target.value }) } max="5" name="number"/>
                            <Button style={{marginTop: '1rem'}} onClick={() => {
                                rateTheRoom({
                                    variables: {
                                        roomID: item.theBookedRoom[0]._id,
                                        userID,
                                        rating: parseInt(review.data)
                                    }
                                })
                            }} variant="contained" color="primary" > Submit </Button>
                        </form>
                    </div>
                </Zoom>

            </div>
    })

    return (
        <div>

            {rooms ? cancelledRooms : <h2 style={{paddingTop: '5rem', textAlign: 'center'}}> You have no bookings, book now </h2> }

        </div>
    )
}

export default Done