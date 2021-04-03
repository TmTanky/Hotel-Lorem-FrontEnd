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
            rating {
                rating
                ratingBy {
                    firstName
                    lastName
                }
            }
            userWhoBooked {
                _id
                isCancelled
                isDone
                    bookedBy {
                        firstName
                        lastName
                    }
            }
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
                    isDone
                    isCancelled
                    theBookedRoom {
                        name
                        price
                    }
                }
            }
        } 
`

export const USER_INFO = gql`
    query userInfo ($userID: ID!) {
        userInfo (userID: $userID) {
            firstName
            lastName
            username
            email
            roomsBooked {
                    _id
                    bookAt
                    isDone
                    isCancelled
                    theBookedRoom {
                        _id
                        name
                        price
                        rating {
                            rating
                        }
                    }
            }
            roomsRated {
                _id
                rating
                ratingBy {
                    firstName
                    lastName
                }
            }
        }
    }
`