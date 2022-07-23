import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useDispatch } from "react-redux";
import { Grid, Label, Icon } from "semantic-ui-react";
import { UserActions } from "../store/UsersSlice";
import { FETCH_USERS_QUERY } from "../util/graphql";
import AdminEditUser from "./AdminEditUser";
import PopupModel from "./PopupModel";
import moment from 'moment'

function AdminUsersList({user}) {

  const dispatch = useDispatch()

  const { id: userId, username, email, createdAt, phone, userrole } = user;
  const [deleteUser] = useMutation(DELETE_USER, {
    update(proxy) {
      let data = proxy.readQuery({query: FETCH_USERS_QUERY})
      data = { getUsers: data.getUsers.filter(user => user.id !== userId) }
      proxy.writeQuery({ query: FETCH_USERS_QUERY, data })
    },
    onError(err) {
      console.log(err);
    },
      variables: { userId }
    }
  );
  const deleteUserHandler = async () => {
    deleteUser();
    dispatch(UserActions.DeleteUser(userId))
  };
  return (
    <>
      <Grid.Row>
        <Grid.Column>{username}</Grid.Column>
        <Grid.Column>{moment(createdAt).fromNow()}</Grid.Column>
        <Grid.Column>{email}</Grid.Column>
        <Grid.Column>{phone}</Grid.Column>
        <Grid.Column>{userrole}</Grid.Column>
        <Grid.Column>
          <Grid.Column>
            <PopupModel
              size="tiny"
              icon="edit"
              content={
                <AdminEditUser
                  userId={userId}
                />
              }
            />
            <Label className="delete-btn" onClick={deleteUserHandler}>
              <Icon name='delete' /> 
            </Label>
          </Grid.Column>
        </Grid.Column>
      </Grid.Row>
    </>
  );
}

const DELETE_USER = gql`
  mutation deleteUser($userId: ID!) {
    deleteUser(userId: $userId)
  }
`

export default AdminUsersList;
