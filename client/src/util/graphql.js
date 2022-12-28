import {
  gql
} from "@apollo/client";
export const FETCH_POSTS_QUERY = gql `
  {
    getPosts {
      id
      title
      body
      createdAt
      username
    }
  }
`;
export const FETCH_USERS_QUERY = gql `
query {
  getUsers {
    id
    username
    email
    isAdmin
    phone
    createdAt
  }
}
`;

export const DELETE_POST_MUTATION = gql`
mutation deletePost($postId: ID!) {
  deletePost(postId: $postId)
}
`;