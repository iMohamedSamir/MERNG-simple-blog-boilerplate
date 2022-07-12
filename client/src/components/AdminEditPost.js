import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, TextArea } from "semantic-ui-react";
import { postsActions } from "../store/PostsSlice";
import { FETCH_POSTS_QUERY } from "../util/graphql";
import { useForm } from "../util/hooks";

function AdminEditPost(props) {
  const { postId } = props;

  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.content);
  const existingPost = posts.find((post) => post.id === postId);

  const initialValues = {
    body: existingPost.body,
    title: existingPost.title,
  };

  const [inputError, setInputError] = useState({});

  const { onSubmit, onChange, onCheckChange, values } = useForm(
    createPostCallback,
    initialValues
  );
  
  const [updatePost, { error }] = useMutation(EDIT_POST, {
    variables: {...values, postId},
    update(proxy, result) {
      const { data: {editPost: editedPost} } = result
      const {title: newTitle, body: newBody} = editedPost 
      console.log("resaultresault", editedPost)
      let data = proxy.readQuery({query: FETCH_POSTS_QUERY})
      data = { getPosts: editedPost }
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      values.title = "";
      values.body = "";
      dispatch(postsActions.editPost(editedPost))
    },
    // onError(err) {
    //     setInputError(err && err.graphQLErrors[0].extensions ? err.graphQLErrors[0].extensions : '')
    // }
  });
  function createPostCallback() {
    updatePost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create Post</h2>
        <Form.Field>
          <Form.Input
            placeholder="xxxx"
            name="title"
            onChange={onChange}
            value={values.title}
            error={inputError.title}
          />
          <TextArea
            style={{ minHeight: 100 }}
            placeholder="xxxx"
            name="body"
            onChange={onChange}
            value={values.body}
            error={inputError.body}
          />
          <Button.Group floated="right">
            <Button type="submit" color="teal">
              Submit
            </Button>
          </Button.Group>
        </Form.Field>
      </Form>
    </>
  );
}
const EDIT_POST = gql`
mutation editPost($postId: ID!, $title: String!, $body: String!) {
  editPost(postId: $postId, title: $title, body: $body) {
    title
    body
    id
    createdAt
    username
    likes {
      id
      username
      createdAt
    }
    comments {
      id
      body
      username
      createdAt
    }
  }
}
`
export default AdminEditPost;
