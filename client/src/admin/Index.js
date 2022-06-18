import React, { useContext } from 'react';
import UserTabs from '../components/UserTabs';
import { AuthContext } from '../context/auth';

function Index(props) {
    const { user } = useContext(AuthContext);
    const adminIndex = user && user.isAdmin ? (
        <>
            <div className="admin-tabs">
                <UserTabs />
            </div>
        </>
        //TODO: refactor this
    ) : ('you are not allowed here');
    return adminIndex;
}
export default Index;