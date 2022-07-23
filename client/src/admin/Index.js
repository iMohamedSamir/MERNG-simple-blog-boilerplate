import React from "react";
import { useSelector } from "react-redux";

import UsersTabs from "../components/UserTabs";

function Index(props) {

  const store = useSelector((state) => state);
  const user = store.auth.currentUser;

  const adminIndex =
    user && user.isAdmin ? ( 
      <>
        <UsersTabs />
      </>
    ) : (
      //TODO: refactor this
      "you are not allowed here"
    );

  return adminIndex;
}

export default Index;
