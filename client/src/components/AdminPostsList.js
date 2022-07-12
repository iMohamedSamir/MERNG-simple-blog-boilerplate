import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid } from "semantic-ui-react";
import { postsActions } from "../store/PostsSlice";

import { FETCH_POSTS_QUERY } from "../util/graphql";
import AdminEditPost from "./AdminEditPost";
import PopupModel from "./PopupModel";

function AdminPostsList({ post }) {
  const dispatch = useDispatch();
  
  const { id: postId, title, body, username, createdAt } = post;

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
      let data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
      data = { getPosts: data.getPosts.filter((post) => post.id !== postId) };
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
    },
    onError(err) {
      console.log(err);
    },
    variables: { postId },
  });

  const deletePostHandler = async () => {
    deletePost();
    dispatch(postsActions.deletePost(postId))
  };

  return (
    <>
      <Grid.Row>
        <Grid.Column width={6}>{title}</Grid.Column>
        <Grid.Column width={2}>{username}</Grid.Column>
        <Grid.Column width={4}>{createdAt}</Grid.Column>
        <Grid.Column>
          <PopupModel
            size="tiny"
            icon="edit"
            content={ <AdminEditPost postId={postId} title={title} body={body} /> }
          />
          <Button
            size="tiny"
            icon="delete"
            onClick={deletePostHandler}
          ></Button>
        </Grid.Column>
      </Grid.Row>
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default AdminPostsList;
