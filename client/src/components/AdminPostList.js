import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { Button, Grid } from 'semantic-ui-react'
function AdminPostList(props) {
    const { postId, title, username, createdAt, } = props
    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        onError(err) {
            console.log(err)
        },
        variables: { postId }
    })
    const deletePostHandler = async () => {
        await deletePost()
    }
    return (
        <>
            <Grid.Row>
                <Grid.Column width={6}>{title}</Grid.Column>
                <Grid.Column width={2}>{username}</Grid.Column>
                <Grid.Column width={4}>{createdAt}</Grid.Column>
                <Grid.Column><Button onClick={deletePostHandler}>Delete</Button></Grid.Column>
            </Grid.Row>
        </>
    );
}

const DELETE_POST_MUTATION = gql`
mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
}
`

export default AdminPostList;