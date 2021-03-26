import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Switch, Route, Link, useRouteMatch} from 'react-router-dom'
import {useQuery} from '@apollo/client'

// import CircularProgress from '@material-ui/core/CircularProgress';

// GraphQL
import { ALL_ROOMS } from '../../graphql/query/queries'

// Components
import CancelLink from './adminLinks/cancel'
import DoneLink from './adminLinks/done'
import OngoingLink from './adminLinks/ongoing'

// CSS
import './adminPage-styles.css'

const AdminPage = () => {

    const user = useSelector(state => state.user.user)
    const {path} = useRouteMatch()

    const { data } = useQuery(ALL_ROOMS)

    const [rooms, setRooms] = useState({
        data: []
    })

    useEffect(() => {
        if (data) {
            setRooms({
                data: data.allRooms
            })
        }
    }, [data])

    return (

        <div className="adminbox" >
            <p style={{fontSize: '2rem', textAlign: 'center', padding: '3rem 0rem'}} > Welcome Admin <strong> {`${user.firstName} ${user.lastName} `} </strong> </p>

            <div>
                <nav className="adminboxlinks">

                    <Link to={`${path}/ongoing`} style={{cursor: 'pointer', textDecoration: 'none', color: 'black'}} > Ongoing </Link>
                    <Link to={`${path}/done`} style={{cursor: 'pointer', textDecoration: 'none', color: 'black'}} > Done </Link>
                    <Link to={`${path}/cancel`} style={{cursor: 'pointer', textDecoration: 'none', color: 'black'}} > Cancelled </Link>
                    
                </nav>
            </div>

            <Switch>
                <Route exact path="/admin/ongoing">
                    <OngoingLink rooms={rooms} />
                </Route>
                <Route exact path="/admin/done">
                    <DoneLink rooms={rooms} />
                </Route>
                <Route exact path="/admin/cancel">
                    <CancelLink rooms={rooms} />
                </Route>
            </Switch>

        </div>
    )
}

export default AdminPage