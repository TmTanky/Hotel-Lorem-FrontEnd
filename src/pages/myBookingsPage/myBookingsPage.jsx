import React from 'react'
import {useSelector} from 'react-redux'
import {Switch, Route, Link, useRouteMatch} from 'react-router-dom'
// import { useQuery } from '@apollo/client'

import Cancelled from './myBookingsLinks/cancelled'
import Done from './myBookingsLinks/done'
import Ongoing from './myBookingsLinks/ongoing'

// GraphQL
// import { USER_INFO, LOGIN_USER } from '../../graphql/query/queries'

// Redux
// import { loadTheUser } from '../../redux/actions/actions'

// CSS
import './myBookings-styles.css'


const MyBookingsPage = () => {

    // const currentUserID = useSelector(state => state.user.user.userID)
    // const dispatch = useDispatch()
    // const userBookedRooms = useSelector(state => state.user.user.roomsBooked)
    const userBookedRooms = useSelector(state => state.userInfo)
    // .user.userInfo.roomsBooked
    // const { loading } = useQuery(USER_INFO, {
    //     variables: {
    //         userID: currentUserID
    //     },
    //     onCompleted: async (data) => {
    //         dispatch(loadTheUser(data))
    //     }
    // })

    // const currentUserID = useSelector(state => state.user.user.userID)
    // const dispatch = useDispatch()
    // const { data, refetch } = useQuery(USER_INFO, {
    //     variables: {
    //         userID: currentUserID
    //     }
    // })

    const {path} = useRouteMatch()

    return (
        <div className="mybookingsbox">

            <h1 style={{textAlign: 'center', padding: '3rem'}} > My Bookings </h1>

            <nav className="bookingslinks">
                <Link to={`${path}/ongoing`} style={{cursor: 'pointer', textDecoration: 'none', color: 'black'}} > All </Link>
                <Link to={`${path}/done`} style={{cursor: 'pointer', textDecoration: 'none', color: 'black'}} > Done </Link>
                <Link to={`${path}/cancel`} style={{cursor: 'pointer', textDecoration: 'none', color: 'black'}} > Cancelled </Link>
            </nav>

            {/* {userBookedRooms ? userBookedRooms.map(item => {
                return <div key={item._id} className="mybooking" >
                    <h1 style={{marginBottom: '1rem'}} > {item.theBookedRoom[0].name} </h1>
                    <p> ${item.theBookedRoom[0].price} </p>
                    <p> Status: <strong> {Math.floor(( Date.parse(item.bookAt) - Date.parse(date2) ) / 86400000) <= 0 ? 'Done' : `${Math.floor(( Date.parse(item.bookAt) - Date.parse(date2) ) / 86400000)} ${Math.floor(( Date.parse(item.bookAt) - Date.parse(date2) ) / 86400000) <= 1 ? 'day' : 'days'} remaining` } </strong> </p>
                    {Math.floor(( Date.parse(item.bookAt) - Date.parse(date2) ) / 86400000) <= 0 ? <Button color="primary" style={{marginTop: '1rem'}} variant="contained" onClick={() => markAsDone(item._id) } > Mark as Done </Button> : <Button color="primary" style={{marginTop: '1rem'}} variant="contained" > Cancel </Button> }
                </div>
            }): <h2 style={{paddingTop: '5rem', textAlign: 'center'}}> You have no bookings, book now </h2> } */}

            <Switch>
                <Route exact path="/mybookings/ongoing" >
                    <Ongoing rooms={userBookedRooms} />
                </Route>
                <Route exact path="/mybookings/done" >
                    <Done rooms={userBookedRooms} />
                </Route>
                <Route exact path="/mybookings/cancel" >
                    <Cancelled  rooms={userBookedRooms} />
                </Route>
            </Switch>

        </div>
    )
}

export default MyBookingsPage
