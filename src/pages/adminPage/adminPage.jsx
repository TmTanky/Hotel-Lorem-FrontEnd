import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Switch, Route, Link, useRouteMatch} from 'react-router-dom'
import {useQuery, useMutation} from '@apollo/client'

// import CircularProgress from '@material-ui/core/CircularProgress';
import {Button, TextField, TextareaAutosize} from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';
import Zoom from '@material-ui/core/Zoom';

// GraphQL
import { ALL_ROOMS } from '../../graphql/query/queries'
import { CREATE_ROOM, DELETE_ROOM } from '../../graphql/mutation/mutations'

// Components
import CancelLink from './adminLinks/cancel'
import DoneLink from './adminLinks/done'
import OngoingLink from './adminLinks/ongoing'

// CSS
import './adminPage-styles.css'

const AdminPage = () => {

    const user = useSelector(state => state.user.user)
    const {path} = useRouteMatch()

    const { data, refetch, loading } = useQuery(ALL_ROOMS)

    const [rooms, setRooms] = useState({
        data: []
    })

    const [checked, setChecked] = useState(false);
    const closeAddForm = () => {
        setChecked(false)
    }

    const [roomDetails, setRoomDetails] = useState({
        name: "",
        type: "",
        price: "",
        description: "",
        maxPersons: ""
    })

    const [deleteTheRoom] = useMutation(DELETE_ROOM)
    const [addTheRoomSubmit] = useMutation(CREATE_ROOM, {
        variables: {
            name: roomDetails.name,
            type: roomDetails.type,
            price: parseInt(roomDetails.price),
            description: roomDetails.description,
            maxPersons: parseInt(roomDetails.maxPersons)
        },onError(err) {
            console.log(err.message)
        }
    })

    const addRoomHandleChange = (e) => {
        const {value, name} = e.target

        setRoomDetails({
            ...roomDetails,
            [name]: value
        })
    }

    useEffect(() => {
        if (data) {
            setRooms({
                data: data.allRooms
            })
        }
    }, [data])

    return (

        <div className="adminbox" >
            <p style={{fontSize: '2rem', textAlign: 'center', paddingTop: '3rem' }} > Welcome Admin </p>
            <p style={{textAlign: 'center', paddingBottom: '3rem'}} > <strong> {`${user.firstName} ${user.lastName} `} </strong> </p>

            <div className="addroombox" >

                <div className="addroombtn" >
                    <Button color="primary" variant="contained" onClick={() => setChecked(true) } > Add room </Button>

                    <Zoom in={checked}>
                        <div className="addroompopup">

                            <div className="addroomclose" >
                                <CancelIcon onClick={() => {
                                    closeAddForm()
                                    refetch((data) => {
                                        setRooms(data)
                                    })
                                } } />
                            </div>

                            <form>
                                <TextField style={{marginBottom: '1rem'}} name="name" value={roomDetails.name} onChange={addRoomHandleChange} label="Name" />
                                <TextField style={{marginBottom: '1rem'}} name="type" value={roomDetails.type} onChange={addRoomHandleChange} label="Type" />
                                <TextField style={{marginBottom: '1rem'}} name="maxPersons" value={roomDetails.maxPersons} onChange={addRoomHandleChange} label="Max Persons" />
                                <TextField style={{marginBottom: '1rem'}} name="price" value={roomDetails.price} onChange={addRoomHandleChange} label="Price" />
                                <TextareaAutosize rowsMin={10} name="description" value={roomDetails.description} onChange={addRoomHandleChange} style={{padding: '0.5rem', fontSize: '1rem', outline: 'none'}} placeholder="Room Description" />
                                <Button variant="contained" color="primary" onClick={() => {
                                    addTheRoomSubmit()
                                    refetch((data) => {
                                        setRooms(data)
                                    })
                                    setRoomDetails({
                                        name: "",
                                        type: "",
                                        description: "",
                                        price: "",
                                        maxPersons: ""
                                    })
                                }} style={{marginTop: '0.5rem'}} > Create Room </Button>
                            </form>
                        </div>
                    </Zoom>

                </div>

                <nav className="adminboxlinks">

                    <Link to={`${path}/ongoing`} style={{cursor: 'pointer', textDecoration: 'none', color: 'black'}} > Ongoing </Link>
                    <Link to={`${path}/done`} style={{cursor: 'pointer', textDecoration: 'none', color: 'black'}} > Done </Link>
                    <Link to={`${path}/cancel`} style={{cursor: 'pointer', textDecoration: 'none', color: 'black'}} > Cancelled </Link>
                    
                </nav>
            </div>

            <Switch>
                <Route exact path="/admin/ongoing">
                    <OngoingLink loading={loading} setRooms={setRooms} data={data} refetch={refetch} deleteTheRoom={deleteTheRoom} rooms={rooms} />
                </Route>
                <Route exact path="/admin/done">
                    <DoneLink loading={loading} rooms={rooms} />
                </Route>
                <Route exact path="/admin/cancel">
                    <CancelLink loading={loading} rooms={rooms} />
                </Route>
            </Switch>

        </div>
    )
}

export default AdminPage