import React from 'react';
import PostForm from '../components/PostForm'
import UsersTab from '../components/UsersTab';

function Index(props) {
    return (
        <>
            <UsersTab /><br /><br /><br />
            <PostForm/>
        </>
    );
}

export default Index;