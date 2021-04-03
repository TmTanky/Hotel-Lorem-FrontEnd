import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Switch, Route, Link, useRouteMatch} from 'react-router-dom'
import {useQuery, useMutation} from '@apollo/client'

// import CircularProgress from '@material-ui/core/CircularProgress';
import {Button, TextField, TextareaAutosize, Collapse, IconButton} from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';
import Zoom from '@material-ui/core/Zoom';
import CloseIcon from '@material-ui/icons/Close'
import { Alert } from '@material-ui/lab';

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

    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [addRoomError, setAddRoomError] = useState({
        roomError: []
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
        onCompleted: () => {
            setOpen2(true)
        },
        onError(err) {
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

                        <Collapse in={open2} className="submitdone" >
                        <Alert
                        action={
                            <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen2(false);
                                refetch((data) => {
                                    setRooms(data)
                                })
                            }}
                            >
                            <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        >
                        New room added
                        </Alert>
                    </Collapse>

                            <div className="addroomclose" >
                                <CancelIcon onClick={() => {
                                    closeAddForm()
                                    refetch((data) => {
                                        setRooms(data)
                                    })
                                } } />
                            </div>

                            <form>
                            {addRoomError.roomError ? 
                        addRoomError.roomError.map(err => {
                            return <Collapse in={open} key={err} >
                                        <Alert severity="warning" style={{marginBottom: '1rem'}}
                                            action={
                                                <IconButton
                                                    aria-label="close"
                                                    color="inherit"
                                                    size="small"
                                                    onClick={() => {
                                                        setOpen(false);
                                                        setAddRoomError({
                                                            roomError: []
                                                        })
                                                    }}
                                                    >
                                                    <CloseIcon fontSize="inherit" />
                                                </IconButton>
                                            }
                                            >
                                            {err.msg}
                                        </Alert>
                                </Collapse>
                    }) : ""}
                                <TextField style={{marginBottom: '1rem'}} name="name" value={roomDetails.name} onChange={addRoomHandleChange} label="Name" />
                                <TextField style={{marginBottom: '1rem'}} name="type" value={roomDetails.type} onChange={addRoomHandleChange} label="Type" />
                                <TextField style={{marginBottom: '1rem'}} name="maxPersons" value={roomDetails.maxPersons} onChange={addRoomHandleChange} label="Max Persons" />
                                <TextField style={{marginBottom: '1rem'}} name="price" value={roomDetails.price} onChange={addRoomHandleChange} label="Price" />
                                <TextareaAutosize rowsMin={10} name="description" value={roomDetails.description} onChange={addRoomHandleChange} style={{padding: '0.5rem', fontSize: '1rem', outline: 'none'}} placeholder="Room Description" />
                                <Button variant="contained" color="primary" onClick={() => {

                                    const { name, type, description, price, maxPersons } = roomDetails
                                    const convertPrice = parseInt(price)
                                    const convertMaxPersons = parseInt(maxPersons)

                                    if (name === "" || type === "" || description === "" || price === "" || maxPersons === "") {
                                        setOpen(true)
                                        setRoomDetails({
                                            name: "",
                                            type: "",
                                            description: "",
                                            price: "",
                                            maxPersons: ""
                                        })
                                        return addRoomError.roomError.push({ msg: 'Please fill all inputs.' })
                                    }

                                    if (isNaN(convertPrice) || isNaN(convertMaxPersons)) {
                                        setOpen(true)
                                        setRoomDetails({
                                            name: "",
                                            type: "",
                                            description: "",
                                            price: "",
                                            maxPersons: ""
                                        })
                                        return addRoomError.roomError.push({ msg: 'Price or Max Persons must be a number.' })
                                    }

                                    addTheRoomSubmit({
                                        variables: {
                                            name: name,
                                            type: type,
                                            price: convertPrice,
                                            description: description,
                                            maxPersons: convertMaxPersons
                                        }
                                    })
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