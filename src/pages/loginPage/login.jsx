import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import {useLazyQuery} from '@apollo/client'
import { TextField, Button } from '@material-ui/core';

// GraphQL
import { LOGIN_USER } from '../../graphql/query/queries'

// CSS
import './login-styles.css'

const LoginPage = () => {

    const [loginTheUser, {called, loading, data, error}] = useLazyQuery(LOGIN_USER)

    const [loginInputs, setLoginInputs] = useState({
        email: "",
        password: ""
    })

    const HandleLogin = (e) => {
        e.preventDefault()

        loginTheUser({
            variables: {
                email: loginInputs.email,
                password: loginInputs.password
            }
        })

        if (error) {
            console.log(error.message)
        }

        if (called && loading) {
            console.log(`Loading`)
        }

        if (data) {
            console.log(data)
        }
        
    }

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
                <TextField type="email" name="email" label="Email" variant="outlined" autoFocus style={{marginBottom: '1rem'}} onChange={handleLoginChange} value={loginInputs.email} />
                <TextField type="password" name="password" label="Password" variant="outlined" onChange={handleLoginChange} value={loginInputs.password} />
                <Button onClick={HandleLogin} variant="contained" style={{marginTop: '0.5rem'}}> Login </Button>
                <Link to="/register" style={{marginTop: '0.5rem', fontSize: '0.9rem'}}> No account? Register now </Link>
                <Button onClick={HandleLogin} variant="contained" style={{marginTop: '0.5rem'}}> Get </Button>
            </form>

        </main>

    )
}

export default LoginPage