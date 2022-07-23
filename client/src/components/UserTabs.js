import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";

import { Tab, Menu, Grid } from "semantic-ui-react";
import PostForm from "../components/PostForm";
import AdminPostsList from "./AdminPostsList";
import AdminUsersList from "./AdminUsersList";
import PopupModel from "./PopupModel";
import Register from "../pages/Register";
import { postsActions } from "../store/PostsSlice";
import { UserActions } from "../store/UsersSlice";
import { FETCH_POSTS_QUERY, FETCH_USERS_QUERY } from "../util/graphql";

//TODO: Refactor this shit of a mess later.

function UsersTabs() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  const dispatch = useDispatch()

  const { data: FetchedPostsData, refetch: refetchPosts } = useQuery( FETCH_POSTS_QUERY, { manual: true } );
  const { data: FetchedUsersData, refetch: refetchUsers } = useQuery( FETCH_USERS_QUERY, { manual: true } );
  
  const handlePosts = async () => {
    const { data } = await refetchPosts();
    setPosts(data.getPosts);
  };

  const handleUsers = async () => { 
    const { data } = await refetchUsers();
    setUsers(data.getUsers);
  };

  useEffect(() => {
    posts && dispatch(postsActions.PostsReducer(posts));
    users && dispatch(UserActions.UserReducer(users));
  }, [posts, users]);

  const store = useSelector((state) => state);

  let dashboard = (
    <Tab.Pane key="message"><div key="xxxxxx4">{"testValu"}</div></Tab.Pane>
  );
  //TODO: Refactor this
  let usersList = (
    <Tab.Pane key="users">
      <PopupModel color="purple" buttonName={"New User"} content={<Register/>} />
      <Grid columns={6} celled color="grey">
        <Grid.Column>username</Grid.Column>
        <Grid.Column>Registration Date</Grid.Column>
        <Grid.Column>E-mail address</Grid.Column>
        <Grid.Column>Phone</Grid.Column>
        <Grid.Column>isAdmin</Grid.Column>
        <Grid.Column>actions</Grid.Column>
        { store.users.content.map((user) => (
            <>
              <AdminUsersList key={user.id} user={user} />
            </>
          ))}
      </Grid>
    </Tab.Pane>
  );
  const postList = (
    // Post list (Edit/delete) tab
    <Tab.Pane key="posts">
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
      grid={{ className: "xtabs", paneWidth: 14, tabWidth: 2 }}
      menu={{ fluid: true, vertical: true, tabular: true }}
      defaultActiveIndex={0}
      panes={panes}
      renderActiveOnly={true}
    />
  )
}


export default UsersTabs;
