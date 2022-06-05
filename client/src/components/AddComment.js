import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useForm } from '../util/hooks';

function AddComment(props) {
    const { user: { user }, postId } = props

    const { onChange, onSubmit, values } = useForm(addCommentCallback, {
        postId,
        body: ''
    })

    const [addComment] = useMutation(CREATE_COMMENT_MUTATION, {
        update(_, data) {
            values.body = ''
        },
        onError(err) {
        },
        variables: values
    })

    function addCommentCallback() {
        addComment()
    }

    let comment
    if (user) {
        comment = (
                <Form onSubmit={onSubmit} noValidate reply>
                    <Form.TextArea
                        type="text"
                        name="body"
                        value={values.body}
                        onChange={onChange}
                    />
                    <Button content='Add Reply' type='submit' labelPosition='left' icon='edit' primary />
                </Form>
        )
    } else (
        comment = (
            <>
                Please login to comment
            </>
        )
    )
    return (
        comment
    );
}

const CREATE_COMMENT_MUTATION = gql`
    mutation createComment(
            $postId: String!,
            $body: String!
        ) {
            createComment(
                postId: $postId,
                body: $body
        ) {
            id username createdAt body
        }
    }
`

export default AddComment;