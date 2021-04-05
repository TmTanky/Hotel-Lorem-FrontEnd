import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useMutation, useQuery } from '@apollo/client'

// GraphQL
import { USER_INFO } from '../../graphql/query/queries'
import { EDIT_ME } from '../../graphql/mutation/mutations'

// Redux
import { loadTheUser } from '../../redux/actions/actions'

import {TextField, Button} from '@material-ui/core'

// CSS
import './editProfile-styles.css'

const ProfilePage = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.userInfo.user.userInfo)
    const userID = useSelector(state => state.user.user.userID)

    const [updateMe, setUpdateMe] = useState({
        firstName: "",
        lastName: ""
    })

    const { loading, data, refetch } = useQuery(USER_INFO, {
        variables: {
            userID
        }
    })

    const [editMyProfile] = useMutation(EDIT_ME,{
        onCompleted: () => {
            refetch()
        }
    })

    useEffect(() => {
        if (loading === false && data) {
            dispatch(loadTheUser(data))
        }
    },[data, dispatch, loading])

    const handleChange = (e) => {
        const { value, name } = e.target

        setUpdateMe({
            ...updateMe,
            [name]: value
        })
    }

    return (
        <div className="editprofilebox">
            
            <form className="editprofileform" >
                <h1 style={{textAlign: 'center', margin: '2rem 0rem'}} > Edit Profile </h1>
                <TextField label="First Name" name="firstName" style={{marginBottom: '0.5rem'}} defaultValue={user.firstName} onChange={handleChange} />
                <TextField label="Last Name" name="lastName" style={{marginBottom: '0.5rem'}} defaultValue={user.lastName} onChange={handleChange} />
                <Button color="primary" variant="contained" style={{marginTop: '2rem'}} onClick={() => {
                    editMyProfile({
                        variables: {
                            userID,
                            firstName: updateMe.firstName === "" ? user.firstName : updateMe.firstName,
                            lastName: updateMe.lastName === "" ? user.lastName : updateMe.lastName
                        }
                    })
                }} > Update </Button>
            </form>

        </div>
    )
}

export default ProfilePage