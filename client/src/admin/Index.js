import { useQuery, gql } from "@apollo/client";
import React, { useEffect } from "react";
import { Grid, Button } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";

import AdminPostCard from "../components/AdminPostCard";
import PopupModel from "../components/PopupModel";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../util/graphql";
import UsersTabs from "../components/UserTabs";

function Index(props) {
  const dispatch = useDispatch();
  
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  const store = useSelector((state) => state);
  const user = store.auth.currentUser;
  const storePosts = store.posts.content;

  const adminIndex =
    user && user.isAdmin ? ( 
      <>
        {/* <div className="admin-tabs">
          <Grid columns={6} celled color="grey">
            <PopupModel
              color="purple"
              buttonName={"New Post"}
              content={<PostForm />}
            />
          </Grid>
          <Grid columns={6} celled color="grey">
            <Grid.Column>title</Grid.Column>
            <Grid.Column>username</Grid.Column>
            <Grid.Column>Date</Grid.Column>
            <Grid.Column>actions</Grid.Column>
          </Grid>
          {loading ? (
            <p>loading....</p>
          ) : (
            data.getPosts &&
            data.getPosts.map((post) => (
              <Grid key={post.id} columns={6} celled color="grey">
                <AdminPostCard post={post} />
              </Grid>
            ))
          )}
        </div> */}
        <UsersTabs />
      </>
    ) : (
      //TODO: refactor this
      "you are not allowed here"
    );

  return adminIndex;
}

export default Index;
