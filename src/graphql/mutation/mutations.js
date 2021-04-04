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

export const REMOVE_ROOM = gql`
    mutation removeRoom($roomID: ID!) {
        removeRoom(roomID: $roomID) {
            name
        }
    }
`

export const CREATE_ROOM = gql`
    mutation createRoom($name: String!, $type: String!, $price: Int!, $maxPersons: Int!, $description: String!) {
        createRoom(name: $name, type: $type, price: $price, maxPersons: $maxPersons, description: $description) {
            name
        }
    }    
`

export const DELETE_ROOM = gql`
    mutation deleteRoom($roomID: ID!) {
        deleteRoom(roomID: $roomID) {
            name
        }
    }
`

export const UNCANCEL_ROOM = gql`
    mutation unCancelRoom($roomID: ID!) {
        unCancelRoom(roomID: $roomID) {
            name
        }
    }
`

export const RATE_ROOM = gql`
    mutation rateRoom($roomID: ID!, $userID: ID!, $rating: Int!, $theRoomToUpdate: ID!) {
        rateRoom(roomID: $roomID, userID: $userID, rating: $rating, theRoomToUpdate: $theRoomToUpdate ) {
            rating
        }
    }
`
