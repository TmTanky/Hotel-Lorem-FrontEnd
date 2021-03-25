import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { useDispatch } from 'react-redux'

import { TextField, Button, Collapse, IconButton } from '@material-ui/core'
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close'

// Redux
import { loginSuccess, loginUser } from '../../redux/actions/actions'

// GraphQL
import { REGISTER_USER } from '../../graphql/mutation/mutations'

// CSS
import './register-styles.css'

const RegisterPage = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [open, setOpen] = useState(false)
    const [registerErrors, setRegisterErrors] = useState({
        err: []
    })
    const [registerInputs, setRegisterInputs] = useState({
        email: "",
        firstName: "",
        lastName: "",
        username: "",
        password: ""
    })

    const [createUser] = useMutation(REGISTER_USER, {
        variables: {
            email: registerInputs.email,
            firstName: registerInputs.firstName,
            lastName: registerInputs.lastName,
            username: registerInputs.username,
            password: registerInputs.password
        },
        onCompleted: async ({createUser}) => {
            dispatch(loginUser(createUser))
            dispatch(loginSuccess())
            await localStorage.setItem('token', createUser.token)
            setTimeout(() => {
                history.push(`/rooms`)
            }, 5000)
        },
        onError(error) {
            setRegisterErrors({
                err: [error.message]
            })
            setOpen(true)
        }
    })

    const handleRegisterChange = (e) => {
        const {value, name} = e.target

        setRegisterInputs({
            ...registerInputs,
            [name]: value
        })

    }

    // const handleRegister = (e) => {
    //     e.preventDefault()

    //     createUser({
    //         variables: {
    //             email: registerInputs.email,
    //             firstName: registerInputs.firstName,
    //             lastName: registerInputs.lastName,
    //             username: registerInputs.username,
    //             password: registerInputs.password
    //         }
    //     })
        
        // if (called) {
        //     dispatch(loginUser(data.createUser))
        //     dispatch(loginSuccess())
        //     localStorage.setItem('token', data.createUser.token)
        //     setTimeout(() => {
        //         history.push(`/rooms`)
        //     }, 2000)
        // }
        
    // }

    return (
        <main className="main3">
            <form className="registerform">
            {registerErrors.err.length > 0 ? 
                        registerErrors.err.map(item => {
                            return <Collapse in={open} key={item} >
                                        <Alert severity="warning" style={{marginBottom: '1rem'}}
                                            action={
                                                <IconButton
                                                    aria-label="close"
                                                    color="inherit"
                                                    size="small"
                                                    onClick={() => {
                                                        setOpen(false);
                                                        setRegisterErrors({
                                                            err: []
                                                        })
                                                    }}
                                                    >
                                                    <CloseIcon fontSize="inherit" />
                                                </IconButton>
                                            }
                                            >
                                            {item}
                                        </Alert>
                                </Collapse>
                    }) : "" }
                    {/* {registerErrors.err.map(item => {
                        return <h1> {item} </h1>
                    })} */}
                <TextField name="email" type="email" label="Email" style={{marginBottom: '1rem'}} value={registerInputs.email} onChange={handleRegisterChange} />
                <TextField name="firstName" type="text" label="First Name" style={{marginBottom: '1rem'}} value={registerInputs.firstName} onChange={handleRegisterChange} />
                <TextField name="lastName" type="text" label="Last Name" style={{marginBottom: '1rem'}} value={registerInputs.lastName} onChange={handleRegisterChange} />
                <TextField name="username" type="text" label="Username" style={{marginBottom: '1rem'}} value={registerInputs.username} onChange={handleRegisterChange} />
                <TextField name="password" type="password" label="Password" style={{marginBottom: '1rem'}} value={registerInputs.password} onChange={handleRegisterChange} />
                <Button variant="contained" onClick={createUser} > Register </Button>
                <Link to="/login" style={{marginTop: '0.5rem', fontSize: '0.9rem'}}> Already have an account? Login now </Link>
            </form>
        </main>
    )
}

export default RegisterPage