import React from 'react'

import { Button } from '@material-ui/core'

const Cancelled = ({rooms}) => {
    
    return (
        <div>

            {rooms ? rooms.map(item => {
                return <div key={item._id} className="mybooking" >
                    {item.isCancelled ? <h1 style={{marginBottom: '1rem'}} > {item.theBookedRoom[0].name} </h1> : null }
                    {item.isCancelled ? <p> Status: <strong> Cancelled </strong> </p> : "" } 
                    {item.isCancelled ? <Button color="primary" variant="contained" style={{marginTop: '1rem'}} > Remove </Button> : ""}
                </div>
            }): <h2 style={{paddingTop: '5rem', textAlign: 'center'}}> You have no bookings, book now </h2> }

        </div>
    )
}

export default Cancelled