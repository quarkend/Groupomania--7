import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import React from 'react'
import Home from "./pages/home/Home";
import Profile from './pages/profile/Profile';
import CreatePost from "./pages/CreatePost";
import Post from "./pages/CreateComment";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import PageNotFound from "./pages/PageNotFound";
import AuthApi from './components/AuthApi';
import axios from "axios";
import ImageUpdate from './components/Images/ImageUpdate'
import CreateComment from './pages/CreateComment';
import AllPosts from './components/allPosts/AllPosts';
import Cookies from 'js-cookie';
// import { API_AUTH_AUTHUSER } from '../../constants/api'
import Topbar from './components/topbar/Topbar'
function App() {
  const [auth, setAuth] = React.useState(false);

  // gestion des cookies
  const readCookie = () => {
    const user = Cookies.get("user");
    if (user) {
      setAuth(true);
    }
  }

  React.useEffect(() => {
    readCookie();
  }, [])



  // Gestion de la NavBar
  let navLink;
  if (auth === true) {
    const userLog = JSON.parse(localStorage.getItem('accessToken'));
    const userId = userLog.id;

    navLink = <>
      <div className="mr-auto">
        <Link to="/posts" className="nav-link">Tous les articles</Link>
        <Link to={"/user/" + userId} className="nav-link">Mon compte</Link>
      </div>
    </>
  } else {
    navLink = <div className="mr-auto">
      <Link to="/register" className="nav-link">S'inscrire</Link>
      <Link to="/login" className="nav-link">Se connecter</Link>
    </div>
  }

  // const logout = () => {
  //   localStorage.removeItem("accessToken");
  //   setAuthState({ username: "", id: 0, status: false });
  // };

  return (
    <div className="App">
      <AuthApi.Provider value={{ auth, setAuth }}>
        <Router>
          <div className="navbar">
            <div className="links">

            </div>
            <div className="className= mr-auto">
              {/* <Link to="/" ><Topbar /></Link> */}
              {navLink}

            </div>
          </div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/createComment" exact component={CreateComment} />
            <Route path="/createpost" exact component={CreatePost} />
            <Route path="/post/:id" exact component={Post} />
            <Route path="/AllPosts/:id" exact component={AllPosts} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="/profile/:id" exact component={Profile} />
            <Route path="*" exact component={PageNotFound} />
            {/* <Route path="/imageupdate/:id" exact component={ImageUpdate} /> */}

          </Switch>
        </Router>
      </AuthApi.Provider>
    </div>
  );
}

export default App;