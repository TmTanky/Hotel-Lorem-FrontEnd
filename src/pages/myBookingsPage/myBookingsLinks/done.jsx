import React from 'react'

import { Button } from '@material-ui/core'

const Done = ({rooms}) => {

    const currentDate = new Date().toLocaleDateString()

    return (
        <div>

            {rooms ? rooms.map(item => {
                return <div key={item._id} className="mybooking" >
                    {item.isDone ? <h1 style={{marginBottom: '1rem'}} > {item.theBookedRoom[0].name} </h1> : null }
                    {item.isDone ? <p> Status: <strong> Done </strong> </p> : "" } 
                    {item.isDone ? <Button color="primary" variant="contained" style={{marginTop: '1rem'}} > Rate Room </Button> : ""}
                </div>
            }): <h2 style={{paddingTop: '5rem', textAlign: 'center'}}> You have no bookings, book now </h2> }

        </div>
    )
}

export default Done