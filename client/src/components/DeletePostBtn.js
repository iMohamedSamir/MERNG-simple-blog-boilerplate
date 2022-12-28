import React from 'react';
import { useMutation } from '@apollo/client';
import { Icon, Label } from 'semantic-ui-react';
import { DELETE_POST_MUTATION } from '../util/graphql';

function DeletePostBtn(props) {
    const postId = props.postId
    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        onError(err) {
            console.log(err);
          },
        variables: { postId }
    })

    const deletePostHandler = () => {
        deletePost()
        // props.history.push('/');
    }
    return (
        <>
            <Label className="edit-btn" onClick={deletePostHandler}>
                <Icon name="delete" />
            </Label>
        </>
    );
}

export default DeletePostBtn;