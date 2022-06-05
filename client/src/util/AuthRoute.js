import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/auth'

function AuthRoute({ component: Component, ...rest }){
    const { user } = useContext(AuthContext);
    user && user.isAdmin ? console.log('Admin') : console.log('Not Admin')
    return (
        <Route 
        {...rest}
        render={ 
            props => 
            user && !user.isAdmin ? <Redirect to="/" /> : <Component {...props} /> 
        }
        />
    )
}

export default AuthRoute;