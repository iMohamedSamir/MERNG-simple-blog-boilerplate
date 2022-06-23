import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

import { clientConfig } from "../clientConfig";
import { AuthActions } from "../store/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

function MenuBar() {
  const user = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  const newLogout = () => {
    dispatch(AuthActions.logout());
  };

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substring(1);
  const [activeItem, setActiveItem] = useState(path);
  const menubar = user ? (
    <div>
      <Menu pointing secondary size="large" color="teal">
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
        <Menu.Item
          name={clientConfig.menuLinks.blog}
          active={activeItem === clientConfig.menuLinks.blog}
          onClick={handleItemClick}
          as={Link}
          to="/blog"
        />
        <Menu.Menu position="right">
          {user.isAdmin && (
            <Menu.Item
              name={clientConfig.menuLinks.admin}
              active={activeItem === clientConfig.menuLinks.admin}
              onClick={handleItemClick}
              as={Link}
              to={`/admin`}
            />
          )}
          <Menu.Item
            name={user.username}
            active={activeItem === user.username}
            onClick={handleItemClick}
            as={Link}
            to={`/u/${user.username}`}
          />
          <Menu.Item
            name="logout"
            active={activeItem === "logout"}
            onClick={newLogout}
            as={Link}
            to="/logout"
          />
        </Menu.Menu>
      </Menu>
    </div>
  ) : (
    <div>
      <Menu pointing secondary size="large" color="teal">
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
        <Menu.Item
          name="blog"
          active={activeItem === "blog"}
          onClick={handleItemClick}
          as={Link}
          to="/blog"
        />
        <Menu.Menu position="right">
          <Menu.Item
            name="login"
            active={activeItem === "login"}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
          <Menu.Item
            name="register"
            active={activeItem === "register"}
            onClick={handleItemClick}
            as={Link}
            to="/register"
          />
        </Menu.Menu>
      </Menu>
    </div>
  );
  return menubar;
}
export default MenuBar;
