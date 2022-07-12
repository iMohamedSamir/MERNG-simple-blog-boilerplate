import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { FETCH_POSTS_QUERY } from "../util/graphql";
import PopupModel from "../components/PopupModel";
import { Grid, Button, Confirm } from "semantic-ui-react";
import { useSelector } from "react-redux";

function AdminPostCard({ post: { title, username, id, createdAt } }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  
  const store = useSelector((state) => state);
  const user = store.auth.currentUser;
  const storePosts = store.posts.content;
  
  console.log("storePosts", storePosts)

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
      setConfirmOpen(false);
      let data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      data = { getPosts: data.getPosts.filter((post) => post.id !== id) };
      console.log("postCARD>>", data);
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
    },
    variables: {
      postId: id,
    },
  });

  return (
    <Grid.Row key={id}>
      <Grid.Column>{title}</Grid.Column>
      <Grid.Column>{username}</Grid.Column>
      <Grid.Column>{createdAt}</Grid.Column>
      <Grid.Column>
        <PopupModel size="tiny" icon="edit" content={""} />
        <Button
          size="tiny"
          icon="delete"
          onClick={() => {
            setConfirmOpen(true);
          }}
        ></Button>
        <Confirm
          open={confirmOpen}
          onCancel={() => {
            setConfirmOpen(false);
          }}
          onConfirm={deletePost}
        />
      </Grid.Column>
    </Grid.Row>
  );
}
const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
export default AdminPostCard;
