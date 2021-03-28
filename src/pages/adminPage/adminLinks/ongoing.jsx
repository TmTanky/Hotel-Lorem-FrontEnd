import React from 'react'

import CircularProgress from '@material-ui/core/CircularProgress';

const OngoingLink = ({rooms}) => {

    return (
        <div>
            {rooms.data.length === 0 ? <CircularProgress style={{ margin: '10rem auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center'}} /> : rooms.data.map(item => {
                return <div key={item.name} className="adminboxstatus" style={{margin: '1rem', padding: '1rem'}} >
                    <h1 style={{margin: '0.5rem 0rem'}} > {item.name} </h1>
                    {/* <p> No. of ongoing booked: <strong> {item.userWhoBooked.length} </strong> </p> */}
                    <p style={{marginTop: '1.5rem'}} > List of persons who booked </p>

                    {item.userWhoBooked.map(item => {
                        return item.isDone === false && item.isCancelled === false ? <li key={item.bookedBy.firstName} style={{marginTop: '0.5rem'}} > {`${item.bookedBy.firstName} ${item.bookedBy.lastName}`} </li> : ""
                    })}

                </div>
            })}
        </div>
    )
}

export default OngoingLink