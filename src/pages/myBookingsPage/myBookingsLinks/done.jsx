import React, {useState} from 'react'

import { Button } from '@material-ui/core'
import Zoom from '@material-ui/core/Zoom';
import CloseIcon from '@material-ui/icons/Close'

const Done = ({rooms}) => {

    const [checked, setChecked] = useState(false)
    const filteredRoom = rooms.user.userInfo.roomsBooked.filter(item => item.isDone === true)

    const cancelledRooms = filteredRoom.map(item => {
        return <div className="mybooking" key={item._id} >
                <h1 style={{marginBottom: '1rem'}} > {item.theBookedRoom[0].name} </h1>
                <p> Status: <strong> {item.isDone ? 'Done' : "" } </strong> </p>
                {item.isDone ? <Button color="primary" variant="contained" style={{marginTop: '1rem'}} onClick={() => {
                    setChecked(true)
                }} > Rate Room </Button> : ""}

                <Zoom in={checked}>
                    <div className="ratebox">
                        <div className="submitclose">
                            <CloseIcon onClick={() => {
                                setChecked(false)
                            }} />
                        </div>

                        <form>
                            <h1 style={{margin: '0.5rem', fontSize: '2.5rem'}} > Submit a review </h1>
                            <input className="submitreview" type="number" min="1" max="5" name="number"/>
                            <Button style={{marginTop: '1rem'}} variant="contained" color="primary" > Submit </Button>
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