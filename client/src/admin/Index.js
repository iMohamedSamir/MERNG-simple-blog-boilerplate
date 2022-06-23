import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import UserTabs from "../components/UserTabs";

function Index(props) {
  const storePosts = useSelector((state) => state);
  const user = useSelector((state) => state.auth.currentUser);
  const handlePrint = (e) => {
    console.log(e);
  };
  console.log(storePosts);
  const anotherID = "here is new id";
  console.log("here did this come from?", user);

  const adminIndex =
    user && user.isAdmin ? (
      <>
        <div className="admin-tabs">
          <Button
            value={"someID"}
            onClick={(e) => {
              handlePrint(anotherID);
            }}
          >
            print
          </Button>
          <UserTabs />
        </div>
      </>
    ) : (
      //TODO: refactor this
      "you are not allowed here"
    );
  return adminIndex;
}
export default Index;
