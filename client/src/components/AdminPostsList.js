import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Grid } from "semantic-ui-react";
import AdminEditPost from "./AdminEditPost";
import PopupModel from "./PopupModel";

function AdminPostsList(props) {
  const { postId, userId, title, body, username, createdAt } = props;
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    onError(err) {
      console.log(err);
    },
    variables: { postId },
  });
  const deletePostHandler = async () => {
    await deletePost();
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
            content={
              <AdminEditPost
                postId={postId}
                userId={userId}
                title={title}
                body={body}
              />
            }
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
