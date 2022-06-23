import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "../util/hooks";

function AdminEditUser(props) {
  const { userId } = props;

  const users = useSelector((state) => state.users);
  // const existingUser = users.find((user) => user.id === userId);

  const initialValues = {};

  const [values, setValues] = useState(initialValues);
  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return "users";
}

export default AdminEditUser;
