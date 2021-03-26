import React from 'react'

import CircularProgress from '@material-ui/core/CircularProgress';

const OngoingLink = ({rooms}) => {


    return (
        <div>
            {rooms.data.length === 0 ? <CircularProgress/> : rooms.data.map(item => {
                return <div key={item.name} >
                    <h1> {item.name} </h1>
                    <p> No. of Users who booked: <strong> {item.userWhoBooked.length} </strong> </p>
                    <p> List of persons who booked </p>

                    {item.userWhoBooked.map(user => {       
                            return <li key={user.bookedBy.firstName} > {`${user.bookedBy.firstName} ${user.bookedBy.lastName}`} </li>
                        })
                    }

                </div>
            })}
        </div>
    )
}

export default OngoingLink