import React from "react";
import { Grid, Button } from "semantic-ui-react";
import AdminEditUser from "./AdminEditUser";
import PopupModel from "./PopupModel";

function AdminUsersList(props) {
  const { username, email, createdAt, phone, userrole } = props.user;
  return (
    <>
      <Grid.Row>
        <Grid.Column>{username}</Grid.Column>
        <Grid.Column>{createdAt}</Grid.Column>
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
                  type="editingUsers"
                  userId={"s"}
                  title={"this is title"}
                  body={"body"}
                />
              }
            />
            <Button size="tiny" icon="delete"></Button>
          </Grid.Column>
        </Grid.Column>
      </Grid.Row>
    </>
  );
}

export default AdminUsersList;
