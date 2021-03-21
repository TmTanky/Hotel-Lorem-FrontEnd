import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { TextField, Button } from '@material-ui/core'
import { useMutation } from '@apollo/client'

// GraphQL
import { REGISTER_USER } from '../../graphql/mutation/mutations'

// CSS
import './register-styles.css'

const RegisterPage = () => {

    const [registerInputs, setRegisterInputs] = useState({
        email: "",
        firstName: "",
        lastName: "",
        username: "",
        password: ""
    })

    const [createUser, { data }]= useMutation(REGISTER_USER)

    const handleRegisterChange = (e) => {
        const {value, name} = e.target

        setRegisterInputs({
            ...registerInputs,
            [name]: value
        })

    }

    const handleRegister = (e) => {
        e.preventDefault()

        createUser({
            variables: {
                email: registerInputs.email,
                firstName: registerInputs.firstName,
                lastName: registerInputs.lastName,
                username: registerInputs.username,
                password: registerInputs.password
            }
        })

        if (data) {
            console.log(data)
        }
    }

    return (
        <main className="main3">
            <form className="registerform">
                <TextField name="email" type="email" label="Email" style={{marginBottom: '1rem'}} value={registerInputs.email} onChange={handleRegisterChange} />
                <TextField name="firstName" type="text" label="First Name" style={{marginBottom: '1rem'}} value={registerInputs.firstName} onChange={handleRegisterChange} />
                <TextField name="lastName" type="text" label="Last Name" style={{marginBottom: '1rem'}} value={registerInputs.lastName} onChange={handleRegisterChange} />
                <TextField name="username" type="text" label="Username" style={{marginBottom: '1rem'}} value={registerInputs.username} onChange={handleRegisterChange} />
                <TextField name="password" type="password" label="Password" style={{marginBottom: '1rem'}} value={registerInputs.password} onChange={handleRegisterChange} />
                <Button variant="contained" onClick={handleRegister} > Register </Button>
                <Link to="/login" style={{marginTop: '0.5rem', fontSize: '0.9rem'}}> Already have an account? Login now </Link>
            </form>
        </main>
    )
}

export default RegisterPage