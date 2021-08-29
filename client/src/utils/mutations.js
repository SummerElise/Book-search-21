import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
        _id
        username
        }
    }
}
`;

export const CREATE_USER = gql`
mutation createUser($username: String!, $password: String!) {
    createVote(username: $username, emial: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}
`;

export const SAVE_BOOK = gql`
mutation saveBook($bookData: bookInput!) {
    saveBook(bookData: $bookData) {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            title
            authors
            description
            image
            link
        }
    }
}
`;

export const DELETE_BOOK = gql`
mutation deleteBook($bookId: String!) {
    deleteBook(bookId: $bookId) {
        _id
        username
        email
        bookCount
        savedBooks {
        bookId
        title
        authors
        description
        image
        link   
        }
    }
}
`;