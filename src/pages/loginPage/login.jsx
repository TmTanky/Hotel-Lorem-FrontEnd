import React, { useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useLazyQuery} from '@apollo/client'
import { useDispatch } from 'react-redux'

// Material UI
import { TextField, Button, Collapse, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'
import { Alert } from '@material-ui/lab';

// Redux
import { loginUser, loginSuccess } from '../../redux/actions/actions'

// GraphQL
import { LOGIN_USER } from '../../graphql/query/queries'

// CSS
import './login-styles.css'

const LoginPage = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [loginInputs, setLoginInputs] = useState({
        email: "",
        password: ""
    })

    const [loginError, setLoginError] = useState({
        loginError: []
    })
    const [open, setOpen] = useState(false)
    const [loginTheUser, {data}] = useLazyQuery(LOGIN_USER, {
        variables: {
            email: loginInputs.email,
            password: loginInputs.password
        },
        onCompleted: () => {
            dispatch(loginUser(data.loginUser))
            dispatch(loginSuccess())
            localStorage.setItem('token', data.loginUser.token )
            history.push(`/rooms`)
        },
        onError(error) {
            setLoginError({
            loginError: [error.message]
            })
            setLoginInputs({
                email: "",
                password: ""
            })
            setOpen(true)
        }
    })

    const handleLoginChange = (e) => {
        const {value, name} = e.target

        setLoginInputs({
            ...loginInputs,
            [name]: value
        })

    }  

    return (
        <main className="main2">
            <div className="loginsidebg" style={{backgroundImage: `url(https://img.freepik.com/free-photo/interior-modern-comfortable-hotel-room_1232-1822.jpg?size=626&ext=jpg&uid=R33294599&ga=GA1.1.1062620942.1616250558)`}} >
                
            </div>

            <form className="loginform">
                <h1> Login </h1>
                    {loginError.loginError.length > 0 ? 
                        loginError.loginError.map(err => {
                            return <Collapse in={open} key={err} >
                                        <Alert severity="warning" style={{marginBottom: '1rem'}}
                                            action={
                                                <IconButton
                                                    aria-label="close"
                                                    color="inherit"
                                                    size="small"
                                                    onClick={() => {
                                                        setOpen(false);
                                                        setLoginError({
                                                            loginError: []
                                                        })
                                                    }}
                                                    >
                                                    <CloseIcon fontSize="inherit" />
                                                </IconButton>
                                            }
                                            >
                                            {err}
                                        </Alert>
                                </Collapse>
                    }) : ""}
                <TextField type="email" name="email" label="Email" variant="outlined" autoFocus style={{marginBottom: '1rem'}} onChange={handleLoginChange} value={loginInputs.email} />
                <TextField type="password" name="password" label="Password" variant="outlined" onChange={handleLoginChange} value={loginInputs.password} />
                <Button onClick={loginTheUser} variant="contained" style={{marginTop: '0.5rem'}}> Login </Button>
                <Link to="/register" style={{marginTop: '0.5rem', fontSize: '0.9rem'}}> No account? Register now </Link>
            </form>

        </main>

    )
}

export default LoginPage