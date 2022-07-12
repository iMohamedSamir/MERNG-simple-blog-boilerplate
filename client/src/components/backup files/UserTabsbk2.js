import React, { useState, useEffect, useCallback } from "react";
import { useQuery, gql } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";

import { Tab, Label, Menu, Grid } from "semantic-ui-react";
import PostForm from "../components/PostForm";
import AdminPostsList from "./AdminPostsList";
import AdminUsersList from "./AdminUsersList";
import PopupModel from "./PopupModel";
import Register from "../pages/Register";
import { postActions } from "../store/postsSlice";

//TODO: Refactor this shit of a mess later.

function UsersTab() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  const [testValu, setTestValu] = useState("");
  const handleDashboard = (e) => {
    setTestValu("xxxxxoop");
  };
  const statePosts = useSelector((state) => state.posts);

  const handlePosts = async (e) => {
    const {
      data: { getPosts: postData },
    } = await refetchPosts();
    setPosts(postData);
    dispatch(postActions.getPostsReducer(postData));
  };

  const handleUsers = async (e) => {
    const {
      data: { getUsers: userData },
    } = await refetchUsers();
    setUsers(userData);
  };

  const { data: FetchedPostsData, refetch: refetchPosts } = useQuery(
    FETCH_POSTS_QUERY,
    { manual: true }
  );
  useEffect(() => {
    posts.length > 0 && statePosts > 0 && setPosts(statePosts);
  }, [posts]);

  const { data: FetchedUsersData, refetch: refetchUsers } = useQuery(
    FETCH_USERS_QUERY,
    { manual: true }
  );

  let dashboard = (
    <Tab.Pane>
      {testValu ? <div key="xxxxxx4">{testValu}</div> : "Val"}
    </Tab.Pane>
  );
  //TODO: Refactor this
  let usersList = (
    <Tab.Pane>
      <PopupModel
        color="purple"
        buttonName={"New User"}
        content={<Register />}
      />
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
                username={user.username}
                phone={user.phone}
                userrole={user.role}
                email={user.email}
                createdAt={user.createdAt}
              />
            </>
          ))}
      </Grid>
    </Tab.Pane>
  );
  const postList = (
    <Tab.Pane>
      <PopupModel
        color="purple"
        buttonName={"New Post"}
        content={<PostForm />}
      />
      <Grid columns={4} celled color="grey">
        <Grid.Column width={6}>Title</Grid.Column>
        <Grid.Column width={2}>Author</Grid.Column>
        <Grid.Column width={4}>CreatedAt</Grid.Column>
        <Grid.Column width={4}>actions</Grid.Column>
        {posts &&
          posts.map((post) => (
            <AdminPostsList
              key={post.id}
              postId={post.id}
              title={post.title}
              body={post.body}
              username={post.username}
              createdAt={post.createdAt}
            />
          ))}
      </Grid>
    </Tab.Pane>
  );

  const panes = [
    {
      menuItem: (
        <Menu.Item onClick={handleDashboard} key="messages">
          Messages
        </Menu.Item>
      ),
      render: () => dashboard,
    },
    {
      menuItem: (
        <Menu.Item onClick={handleUsers} key="users">
          Users
        </Menu.Item>
      ),
      render: () => usersList,
    },
    {
      menuItem: (
        <Menu.Item onClick={handlePosts} key="posts">
          Posts
        </Menu.Item>
      ),
      render: () => postList,
    },
  ];
  let allTabs = (
    <Tab
      grid={{ paneWidth: 14, tabWidth: 2 }}
      menu={{ fluid: true, vertical: true, tabular: true }}
      defaultActiveIndex={0}
      panes={panes}
      renderActiveOnly={true}
    />
  );
  return allTabs;
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

export default UsersTab;
