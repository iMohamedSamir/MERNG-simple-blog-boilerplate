import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "../util/hooks";
import { FETCH_POSTS_QUERY } from "../util/graphql";
import { useDispatch } from "react-redux";
import { postsActions } from "../store/PostsSlice";

function PostForm(props) {
  const [inputError, setInputError] = useState({});
  const dispatch = useDispatch();
  const { onSubmit, onChange, onCheckChange, values } = useForm(createPostCallback, {
      title: "",
      body: "",
    }
  );

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, resault) {
      const {data: { createPost }} = resault
      let data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      data = { getPosts: [resault.data.createPost, ...data.getPosts] };
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      values.title = "";
      values.body = "";
      dispatch(postsActions.AddPost(createPost))
    },
    // onError(err) {
    //     setInputError(err && err.graphQLErrors[0].extensions ? err.graphQLErrors[0].extensions : '')
    // }
  });
  function createPostCallback() {
    createPost();
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
          <Form.Input
            placeholder="xxxx"
            name="body"
            onChange={onChange}
            value={values.body}
            error={inputError.body}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
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

export default PostForm;
