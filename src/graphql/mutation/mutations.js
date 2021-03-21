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
