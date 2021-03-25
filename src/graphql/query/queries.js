import { gql } from '@apollo/client'

export const ALL_ROOMS = gql`
    query {
        allRooms {
            _id
            name
            description
            price
            maxPersons
            type
        },
    }
`

export const LOGIN_USER = gql`
    query loginUser($email: String!, $password: String!) {
            loginUser(email: $email, password: $password) {
                userID
                firstName
                lastName
                token
                isAdmin
                roomsBooked {
                    _id
                    bookAt
                    theBookedRoom {
                        name
                        price
                    }
                }
            }
        } 
`