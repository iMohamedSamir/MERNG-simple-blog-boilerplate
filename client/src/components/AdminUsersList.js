import React from 'react';
import { Table } from 'semantic-ui-react'
function AdminUsersList(props) {
    const { username, email, createdAt, phone, userrole } = props
    return (
        <>

            <Table.Body>
                <Table.Row>
                    <Table.Cell>{username}</Table.Cell>
                    <Table.Cell>{createdAt}</Table.Cell>
                    <Table.Cell>{email}</Table.Cell>
                    <Table.Cell>{phone}</Table.Cell>
                    <Table.Cell>{userrole}</Table.Cell>
                </Table.Row>
            </Table.Body>
        </>
    );
}

export default AdminUsersList;