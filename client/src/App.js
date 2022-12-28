import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";
import MenuBar from "./components/MenuBar";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthRoute from "./util/AuthRoute";
import Admin from "./admin/Index";
import SinglePost from "./pages/SinglePost";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Container>
      <MenuBar />
      <h1 className="text-red-200">XXXXX</h1>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Blog" element={<Blog />} />

        <Route exact path="/admin" element={<AuthRoute Component={<Admin />} />} />
        <Route exact path="/Login" element={<AuthRoute Component={<Login />} />}/>
        <Route exact path="/Register" element={<AuthRoute Component={<Register />} />} />

        <Route exact path="/posts/:postId" element={<SinglePost />} />
      </Routes>
      </Container>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
