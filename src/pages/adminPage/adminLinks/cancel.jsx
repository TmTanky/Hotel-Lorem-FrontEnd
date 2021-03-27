import React from 'react'

import CircularProgress from '@material-ui/core/CircularProgress';

const CancelLink = ({rooms}) => {
    
    return (
        <div>
            <div>
            {rooms.data.length === 0 ? <CircularProgress/> : rooms.data.map(item => {
                return <div key={item.name} style={{margin: '1rem 0rem', padding: '1rem 2rem'}} >
                    <h1 style={{margin: '0.5rem 0rem'}}  > {item.name} </h1>
                    <p style={{marginTop: '1.5rem'}} > List of persons who cancelled: </p>
                    {item.userWhoBooked.map(item => {
                        return item.isCancelled === true ? <li key={item.bookedBy.firstName} style={{marginTop: '0.5rem'}} > {`${item.bookedBy.firstName} ${item.bookedBy.lastName}`} </li> : ""
                    })}
                </div>
            }) }
        </div>
        </div>
    )
}

export default CancelLink