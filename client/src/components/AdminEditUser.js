import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'semantic-ui-react'

import { UserActions } from '../store/UsersSlice';
import { FETCH_USERS_QUERY } from '../util/graphql';
import { useForm } from '../util/hooks'

function AdminEditUser(props) {
  const { userId } = props;

  const dispatch = useDispatch();

  const existingUser = useSelector((state) => state.users.content).find((user) => user.id === userId); 

  const [errors, setErrors] = useState({})

  const { onCheckChange, onChange, onSubmit, values } = useForm(registerUserCallback, { 
      id: existingUser.id,
      username: existingUser.username,
      email: existingUser.email,
      password: '',
      confirmPassword: '',
      isAdmin: false
  })
  const [editUser, { loading }] = useMutation(EDIT_USER, {
      variables: {...values, "id": userId},
      update(proxy, { data: { editUser } }) {
          let data  = proxy.readQuery({query: FETCH_USERS_QUERY})
          data = { getUsers: editUser }
          proxy.writeQuery({query: FETCH_USERS_QUERY, data})
          dispatch(UserActions.EditUser(editUser))
          //TODO: Success Message
      },
      onError(err) {
        console.log(err)
          // err && setErrors(err && err.graphQLErrors[0].extensions ? err.graphQLErrors[0].extensions.errors : '');
      },
  });
  
  function registerUserCallback() { 
    editUser() 
  }

  return (
      <div className="form-container">
          <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
              <h1>Edit User</h1>
              <Form.Input
                  label="Username"
                  placeholder="Username.."
                  name="username"
                  type="text"
                  value={values.username}
                  error={errors.username ? true : false}
                  onChange={onChange}
              />
              <Form.Input
                  label="Email"
                  placeholder="Email.."
                  name="email"
                  type="email"
                  value={values.email}
                  error={errors.email ? true : false}
                  onChange={onChange}
              />
              <Form.Input
                  label="Password"
                  placeholder="Password.."
                  name="password"
                  type="password"
                  value={values.password}
                  error={errors.password ? true : false}
                  onChange={onChange}
              />
              <Form.Input
                  label="Confirm Password"
                  placeholder="Confirm Password.."
                  name="confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  error={errors.confirmPassword ? true : false}
                  onChange={onChange}
              />
              <Form.Input
                  label="isAdmin"
                  name="isAdmin"
                  type="checkbox"
                  value={values.isAdmin}
                  onChange={onCheckChange}
              />
              <Button type="submit" primary>Update User</Button>
          </Form>
          {Object.keys(errors).length > 0 && (
              <div className="ui error message">
                  <ul className="list">
                      {Object.values(errors).map(value => (
                          <li key={value}>{value}</li>
                      ))}
                  </ul>
              </div>
          )}
      </div>
  );
}
  


const EDIT_USER = gql`
  mutation editUser(
    $id: ID!
    $username: String,
    $email: String,
  ){
    editUser(
      editUserInput: {
        id: $id,
        username: $username,
        email: $email,
      }
    ) {
      id
      username
      email
    }
  }
`
export default AdminEditUser;
