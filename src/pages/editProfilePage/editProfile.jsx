import React from 'react'
import { useSelector } from 'react-redux'

import {TextField, Button} from '@material-ui/core'

// CSS
import './editProfile-styles.css'

const ProfilePage = () => {

    const user = useSelector(state => state.user.user)

    return (
        <div className="editprofilebox">
            
            <form className="editprofileform" >
                <h1 style={{textAlign: 'center', margin: '2rem 0rem'}} > Edit Profile </h1>
                <TextField label="First Name" style={{marginBottom: '0.5rem'}} defaultValue={user.firstName} />
                <TextField label="Last Name" style={{marginBottom: '0.5rem'}} defaultValue={user.lastName} />
                <Button color="primary" variant="contained" style={{marginTop: '2rem'}} > Update </Button>
            </form>

        </div>
    )
}

export default ProfilePage