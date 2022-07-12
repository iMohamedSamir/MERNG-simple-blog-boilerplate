import React from 'react';
// import { useAsync } from "react-async"
import { gql, useQuery } from '@apollo/client';

import PostCard from '../components/PostCard'
import { Item } from 'semantic-ui-react'
function Blog() {
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);
    let posts = {}
    if (loading) { console.log('loading..') }
    else if (data) posts = data.getPosts;
    if (posts.length > 1) {
        return (
            <Item.Group>
                <h2>Recent Posts</h2>
                {loading 
                    ? (<h1> Posts is loading...</h1>) 
                    : (posts && posts.map((post) => (<PostCard key={post.id} post={post} />)))
                }
            </Item.Group>

        );
    } else return ''
}

const FETCH_POSTS_QUERY = gql`
    {
        getPosts {
            id
            title
            body
            createdAt
            username
            comments {
                id
            }
            likes {
                id
            }
        }
    }
`

export default Blog;