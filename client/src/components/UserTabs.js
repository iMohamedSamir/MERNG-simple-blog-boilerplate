import React, { useState, useEffect, useCallback } from 'react';
import { useQuery, gql } from '@apollo/client';

import { Tab, Table, Grid } from 'semantic-ui-react';
import PostForm from '../components/PostForm'
import AdminPostList from './AdminPostList';
import AdminUsersList from './AdminUsersList';
import PopupModel from './PopupModel';
import Register from '../pages/Register';

//TODO: Refactor this shit of a mess later.

function UsersTab() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    document.getElementById("postsTab").addEventListener("click", handlePost);
    document.getElementById("usersTab").addEventListener("click", handleUsers);
  }, [handleUsers]);

  const handlePost = useCallback(async (e) => {
    const { data: { getPosts: postData } } = await refetchPosts()
    setPosts(postData)
  }, [data])

  const handleUsers = useCallback(async (e) => {
    const { data: { getUsers: userData } } = await refetchUsers()
    setUsers(userData)
  }, [data])

  const { data: FetchedPostsData, refetch: refetchPosts } = useQuery(FETCH_POSTS_QUERY, { manual: true, });
  const { data, FetchedUsersData, refetch: refetchUsers } = useQuery(FETCH_USERS_QUERY, { manual: true, });

  let dashboard = (
    <Tab.Pane>welcome to Admin dashboard</Tab.Pane>
  )
  //TODO: Refactor this
  let usersList = (
    <Tab.Pane>
      <PopupModel buttonName={'New User'} content={<Register />} />
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>username</Table.HeaderCell>
            <Table.HeaderCell>Registration Date</Table.HeaderCell>
            <Table.HeaderCell>E-mail address</Table.HeaderCell>
            <Table.HeaderCell>Phone</Table.HeaderCell>
            <Table.HeaderCell>isAdmin</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {users && users.map(user => (
          <AdminUsersList key={user.id} username={user.username} phone={user.phone} userrole={user.role} email={user.email} createdAt={user.createdAt} />
        ))}
      </Table>
    </Tab.Pane>
  )
  let postList = (
    <Tab.Pane>
      <PopupModel buttonName={'New Post'} content={<PostForm />} />
      <Grid columns={4} celled color='grey'>
        <Grid.Column width={6}>title</Grid.Column>
        <Grid.Column width={2}>Author</Grid.Column>
        <Grid.Column width={4}>CreatedAt</Grid.Column>

        {posts && posts.map(post => (
          <AdminPostList key={post.id} postId={post.id} title={post.title} username={post.username} createdAt={post.createdAt} />
        ))}
      </Grid>
    </Tab.Pane>
  )

  const panes = [
    { menuItem: { name: 'Dashboard', id: 'dashboard', key: 'Dashboard' }, render: () => dashboard },
    { menuItem: { name: 'Users', id: 'usersTab', key: 'users' }, render: () => usersList },
    { menuItem: { name: 'Posts', id: 'postsTab', key: 'posts' }, render: () => postList },
  ]

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
  query{
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
`
const FETCH_USERS_QUERY = gql`
  query{
    getUsers {
      id
      username
      email
      isAdmin
      phone
      createdAt
    }
  }
`

export default UsersTab