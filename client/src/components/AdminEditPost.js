import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Form, TextArea } from "semantic-ui-react";
import { useForm } from "../util/hooks";

function AdminEditPost(props) {
  const { postId } = props;

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

  const [updatePost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(_, result) {
      values.title = "";
      values.body = "";
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

const CREATE_POST_MUTATION = gql`
  mutation createPost($title: String!, $body: String!) {
    createPost(title: $title, body: $body) {
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
`;
export default AdminEditPost;
