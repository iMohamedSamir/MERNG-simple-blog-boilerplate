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

import { GridComponent, ColumnDirective, ColumnsDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { customersData, customersGrid } from '../util/temp'

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

  const actionBegin = (args) => { 
    if (args.requestType === "delete") { //triggers while deleting the record 
      console.log("actionBegin triggers"); 
      console.log(args.data); 
    } 
    if (args.requestType === "save") { //triggers while adding the record 
      console.log("actionBegin triggers"); 
      console.log(args.data); 
       
    } 
  } 

  let actionComplete = (args) => {
    console.log('action completed>>>>><<<')
    if (args.requestType === "save") { // triggers when the record was added  
      console.log("actionComplete triggers"); 
      console.log(args.data); 
    } 
    if (args.requestType === "delete") { // triggers when the record was deleted 
      console.log("actionComplete triggers"); 
      console.log(args.data); 
    } 
    if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
        const dialog = args.dialog;
        dialog.showCloseIcon = false;
        dialog.height = 400;
        // change the header of the dialog
        dialog.header = args.requestType === 'beginEdit' ? 'Edit Record of ' + args.rowData['CustomerID'] : 'New Customer';
    }
  };

  let dashboard = (
    <Tab.Pane key="message"><div key="xxxxxx4">{"testValu"}</div></Tab.Pane>
  );

  //TODO: Refactor this
  let usersList = (
    <Tab.Pane key="users">
       {/* <PopupModel color="purple" buttonName={"New User"} content={<Register/>} />
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
      </Grid> */}

    <GridComponent 
      dataSource={store.users.content}
      actionComplete={actionComplete} 
      actionBegin={actionBegin} 
      allowPaging
      allowSorting
      toolbar={['Add', 'Edit', 'Delete', 'Search']}
      editSettings={{ allowAdding: true, allowDeleting: true, allowEditing: true, mode: 'Dialog' }}
      width="auto"
    >
      <ColumnsDirective>
        {customersGrid.map((item, idx) => (
          <ColumnDirective key={idx} {...item}/>
        ))}
      </ColumnsDirective>
      <Inject services={[ Page, Toolbar, Selection, Edit, Sort, Filter ]}/>
    </GridComponent>
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
