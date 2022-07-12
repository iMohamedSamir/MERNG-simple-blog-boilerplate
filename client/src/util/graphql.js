import { gql } from "@apollo/client";
export const FETCH_POSTS_QUERY = gql`
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
