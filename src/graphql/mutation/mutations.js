import { gql } from '@apollo/client'

export const REGISTER_USER = gql`
    mutation createUser($email: String!, $firstName: String!, $lastName: String!, $username: String!, $password: String!) {
        createUser(email: $email, firstName: $firstName, lastName: $lastName, username: $username, password: $password) {
            userID
            firstName
            lastName
            token
        }
    }
`

export const ADD_BOOKED_ROOM = gql`
    mutation bookARoom($bookedBy: ID!, $theBookedRoom: ID!, $bookAt: String!) {
        bookARoom(bookedBy: $bookedBy, theBookedRoom: $theBookedRoom, bookAt: $bookAt) {
            _id
        }
    }
`

export const CANCEL_ROOM = gql`
    mutation cancelRoom($roomID: ID!) {
        cancelRoom(roomID: $roomID) {
            name
        }
    }
`

export const MARK_AS_DONE = gql`
    mutation markAsDone($roomID: ID!) {
        markAsDone(roomID: $roomID) {
            name
        }
    }
`
