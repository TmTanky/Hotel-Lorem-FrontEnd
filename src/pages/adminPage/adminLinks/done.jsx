import React from 'react'

import CircularProgress from '@material-ui/core/CircularProgress';

const DoneLink = ({rooms, loading}) => {

    return (
        <div>
            {loading ? <CircularProgress style={{ margin: '10rem auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center'}} /> : rooms.data.length === 0 ? <h1 style={{margin: 'auto', textAlign: 'center', padding: '4rem 0rem'}} > No rooms add now </h1>  : rooms.data.map(item => {
                return <div key={item.name} className="adminboxstatus" style={{margin: '1rem', padding: '1rem'}} >
                    <h1 style={{margin: '0.5rem 0rem'}}  > {item.name} </h1>
                    <p style={{marginTop: '1.5rem'}} > List of persons who mark as done: </p>
                    {item.userWhoBooked.map(item => {
                        return item.isDone === true ? <li key={item._id} style={{marginTop: '0.5rem'}} > <strong> {`${item.bookedBy.firstName} ${item.bookedBy.lastName}`} </strong> </li> : ""
                    })}
                </div>
            })}
        </div>
    )
}

export default DoneLink