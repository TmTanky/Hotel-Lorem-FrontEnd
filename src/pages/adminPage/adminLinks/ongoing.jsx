import React from 'react'

import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';

const OngoingLink = ({rooms, deleteTheRoom, setRooms, refetch, loading}) => {

    return (
        <div>
            {loading ? <CircularProgress style={{ margin: '10rem auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', alignContent: 'center'}} /> : rooms.data.length === 0 ? <h1 style={{margin: 'auto', textAlign: 'center', padding: '4rem 0rem'}} > No rooms add now </h1> : rooms.data.map(item => {
                return <div key={item._id} className="adminboxstatus" style={{margin: '1rem', padding: '1rem'}} >
                    <h1 style={{margin: '0.5rem 0rem'}} > {item.name} <DeleteIcon style={{cursor: 'pointer'}} onClick={ async () => {
                        await deleteTheRoom({
                            variables: {
                                roomID: item._id
                            }
                        })
                        refetch(async (data) => {
                            await setRooms(data)
                        })
                    }} /> </h1>
                    <p style={{marginTop: '1.5rem'}} > List of persons who booked </p>

                    {item.userWhoBooked.map(myRoom => {
                        return myRoom.isDone === false && myRoom.isCancelled === false ? <li key={myRoom._id} style={{marginTop: '0.5rem'}} > <strong> {`${myRoom.bookedBy.firstName} ${myRoom.bookedBy.lastName}`} </strong> </li> : ""
                    })}

                </div>
            })}
        </div>
    )
}

export default OngoingLink