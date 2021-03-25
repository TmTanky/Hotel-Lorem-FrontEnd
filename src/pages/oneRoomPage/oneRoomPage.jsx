import React, {useEffect, useState} from 'react'
import {useQuery, useMutation} from '@apollo/client'
import {useSelector} from 'react-redux'
import {useRouteMatch} from 'react-router-dom'

import { Button, Fade, Backdrop, Modal } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

// GraphQL
import { ALL_ROOMS } from '../../graphql/query/queries';


// CSS
import './oneRoom-styles.css'
import { ADD_BOOKED_ROOM } from '../../graphql/mutation/mutations';

// Material UI Styles

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    datepicker: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        backgroundColor: 'white',
        padding: '2rem 4rem',
        border: 'none',
        borderRadius: '5px',
        outline: 'none'
    }
}))

const OneRoomPage = () => {

    const urlParams = useRouteMatch()
    const classes = useStyles()

    const { loading, error, data } = useQuery(ALL_ROOMS)
    const user = useSelector(state => state.user.user.userID)
    const [rooms, setRooms] = useState({
        data: []
    })
    const token = localStorage.getItem('token')
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState({
        date: new Date()
    })

    const handleDateChange = (date) => {
        setSelectedDate({
            date
        });
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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

    const [bookARoom] = useMutation(ADD_BOOKED_ROOM)

    const theRoom = rooms.data.filter(room => room._id === urlParams.params.id)

    const date1 = selectedDate.date.toLocaleDateString()
    const date2 = new Date().toLocaleDateString()

    var diff =  Math.floor(( Date.parse(date1) - Date.parse(date2) ) / 86400000)

    console.log(diff)

    return (
        <div className="oneroombox">
            {loading ? <CircularProgress style={{margin: 'auto'}} /> : theRoom.map(room => {
                return <div key={room._id} className="oneroomcard" >
                    <img src="https://image.freepik.com/free-photo/modern-studio-apartment-design-with-bedroom-living-space_1262-12375.jpg" style={{width: '50vw', margin: '2rem auto 2rem auto'}} alt=""/>
                    <h1> {room.name} </h1>
                    <p> Type: {room.type} </p>
                    <p> Price: ${room.price} </p>
                    <p> Max Persons: {room.maxPersons} </p>
                    <p style={{marginTop: '1rem'}} > <strong> "{room.description}" </strong> </p>
                    <Button onClick={handleOpen} variant="contained" color="primary" style={{marginTop: '1rem', width: '100px'}} > Book </Button>

                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={open}
                        onClose={handleClose}
                        value={selectedDate.date}
                        className={classes.modal}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                        timeout: 500,
                        }}>
                        <Fade in={open}>
                            <div className={classes.datepicker}>
                                <h2> Choose a date </h2>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="Date picker dialog"
                                            format="MM/dd/yyyy"
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                        <Button variant="contained" color="primary" onClick={() => {
                                            bookARoom({
                                                variables: {
                                                    theBookedRoom: room._id,
                                                    bookedBy: user,
                                                    bookAt: selectedDate.date.toLocaleDateString() 
                                                },
                                                context: {
                                                    headers: {
                                                        'auth': `Bearer ${token}`
                                                    }
                                                }
                                            })
                                            handleClose()
                                        }} > Confirm </Button>
                                    </MuiPickersUtilsProvider>    
                            </div>
                        </Fade>
                    </Modal>

                </div>
            })}
        </div>
    )
}

export default OneRoomPage