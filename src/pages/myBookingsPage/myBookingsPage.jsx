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

    const userBookedRooms = useSelector(state => state.userInfo)
    const {path} = useRouteMatch()

    return (
        <div className="mybookingsbox">

            <h1 style={{textAlign: 'center', padding: '3rem'}} > My Bookings </h1>

            <nav className="bookingslinks">
                <Link to={`${path}/ongoing`} style={{cursor: 'pointer', textDecoration: 'none', color: 'black'}} > All </Link>
                <Link to={`${path}/done`} style={{cursor: 'pointer', textDecoration: 'none', color: 'black'}} > Done </Link>
                <Link to={`${path}/cancel`} style={{cursor: 'pointer', textDecoration: 'none', color: 'black'}} > Cancelled </Link>
            </nav>

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
