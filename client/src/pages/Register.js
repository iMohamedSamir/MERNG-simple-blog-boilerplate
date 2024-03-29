import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form } from 'semantic-ui-react'

import { UserActions } from '../store/UsersSlice';
import { FETCH_USERS_QUERY } from '../util/graphql';
import { useForm } from '../util/hooks'


function Register({history, setOpen}) {

    const dispatch = useDispatch();

    const [errors, setErrors] = useState({})

    const { onCheckChange, onChange, onSubmit, values } = useForm(registerUserCallback, { 
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        isAdmin: false
    })

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        variables: values,
        update(proxy, { data: { register } }) {
            let data = proxy.readQuery({query: FETCH_USERS_QUERY})
            data = { getUsers: [ register, ...data.getUsers ] }
            proxy.writeQuery({query: FETCH_USERS_QUERY, data})
            
            let newCache = proxy.readQuery({query: FETCH_USERS_QUERY})
            //TODO: investgate why this returns null dispite returning obj in <PostForm>
            // console.log("newCache>>", newCache)
            setOpen(false)
            dispatch(UserActions.AddUser(register))
            // context.login(register)
            history.push('/') 
            
        },
        onError(err) {
            // err && setErrors(err && err.graphQLErrors[0].extensions ? err.graphQLErrors[0].extensions.errors : '');
        },
    });
    
    function registerUserCallback() { 
        addUser() 
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Register</h1>
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
                <Button type="submit" primary>
                    Register
                </Button>
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


const REGISTER_USER = gql`
    mutation register(
        $username: String!,
        $email: String!,
        $password: String!,
        $confirmPassword: String!,
        $isAdmin: Boolean!
    ) {
        register(
            registerInput: {
                username: $username,
                email: $email,
                password: $password,
                confirmPassword: $confirmPassword,
                isAdmin: $isAdmin
            }
        ) {
            id username email createdAt isAdmin token 
        }
    }
`

export default Register;