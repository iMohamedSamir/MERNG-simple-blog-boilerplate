import React, { useState, useEffect, useCallback } from "react";
import { useQuery, gql } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";

import { Tab, Label, Menu, Grid } from "semantic-ui-react";
import PostForm from "../components/PostForm";
import AdminPostsList from "./AdminPostsList";
import AdminUsersList from "./AdminUsersList";
import PopupModel from "./PopupModel";
import Register from "../pages/Register";
import { postsActions } from "../store/PostsSlice";

//TODO: Refactor this shit of a mess later.

function UsersTabs() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  const dispatch = useDispatch()

  const handlePosts = async () => {
    const { data } = await refetchPosts();
    setPosts(data.getPosts);
  };

  const handleUsers = async () => { 
    const { data } = await refetchUsers();
    setUsers(data.getUsers);
  };

  const { data: FetchedPostsData, refetch: refetchPosts } = useQuery( FETCH_POSTS_QUERY, { manual: true } );
  const { data: FetchedUsersData, refetch: refetchUsers } = useQuery( FETCH_USERS_QUERY, { manual: true } );
  
  useEffect(() => {
    posts && dispatch(postsActions.PostsReducer(posts))
  }, [posts]);

  const store = useSelector((state) => state);

  let dashboard = (
    <Tab.Pane><div key="xxxxxx4">{"testValu"}</div></Tab.Pane>
  );
  //TODO: Refactor this
  let usersList = (
    <Tab.Pane>
      <PopupModel color="purple" buttonName={"New User"} content={<Register />} />
      <Grid columns={6} celled color="grey">
        <Grid.Column>username</Grid.Column>
        <Grid.Column>Registration Date</Grid.Column>
        <Grid.Column>E-mail address</Grid.Column>
        <Grid.Column>Phone</Grid.Column>
        <Grid.Column>isAdmin</Grid.Column>
        <Grid.Column>actions</Grid.Column>
        {users &&
          users.map((user) => (
            <>
              <AdminUsersList
                key={user.id}
                user={user}
              />
            </>
          ))}
      </Grid>
    </Tab.Pane>
  );
  console.log("store.posts.content>>", store.posts.content)
  const postList = (
    <Tab.Pane>
      <PopupModel color="purple" buttonName={"New Post"} content={<PostForm />} />
      <Grid columns={4} celled color="grey">
        <Grid.Column width={6}>Title</Grid.Column>
        <Grid.Column width={2}>Author</Grid.Column>
        <Grid.Column width={4}>CreatedAt</Grid.Column>
        <Grid.Column width={4}>actions</Grid.Column>
        {(store.posts.content) ? (
          // JSON.stringify(posts)
          store.posts.content.map((post) => (
            <AdminPostsList post={post} key={post.id} />
          ))
        ):( "loading" )
        }
      </Grid>
    </Tab.Pane>
  );

  const panes = [
    {
      menuItem: (
        <Menu.Item key="messages">Messages</Menu.Item>
      ),render: () => dashboard,
    },
    {
      menuItem: (
        <Menu.Item onClick={handleUsers} key="users">Users</Menu.Item>
      ), render: () => usersList,
    },
    {
      menuItem: (
        <Menu.Item onClick={handlePosts} key="posts">Posts</Menu.Item>
      ), render: () => postList,
    },
  ];
  return (
    <Tab
      grid={{ paneWidth: 14, tabWidth: 2 }}
      menu={{ fluid: true, vertical: true, tabular: true }}
      defaultActiveIndex={0}
      panes={panes}
      renderActiveOnly={true}
    />
  )
}
const FETCH_POSTS_QUERY = gql`
  query {
    getPosts {
      id
      title
      body
      createdAt
      username
      comments {
        id
      }
      likes {
        id
      }
    }
  }
`;
const FETCH_USERS_QUERY = gql`
  query {
    getUsers {
      id
      username
      email
      isAdmin
      phone
      createdAt
    }
  }
`;

export default UsersTabs;
