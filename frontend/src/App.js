import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import React from 'react'
import Home from "./pages/home/Home";
import Profile from './pages/profile/Profile';
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import PageNotFound from "./pages/PageNotFound";
import { AuthContext } from "./helpers/AuthContext";
import axios from "axios";
// import { API_AUTH_AUTHUSER } from '../../constants/api'
function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <div className="links">
              {!authState.status ? (
                <span>
                  <Link to="/login"> Login</Link>
                  <Link to="/register"> Registration</Link>
                </span>
              ) : (
                <span>
                  <Link to="/"> Home Page</Link>
                  <Link to="/createpost"> Create A Post</Link>
                </span>
              )}
            </div>
            <div className="loggedInContainer">
              <h1>{authState.username} </h1>
              {authState.status && <button onClick={logout}> Logout</button>}
            </div>
          </div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/createpost" exact component={CreatePost} />
            <Route path="/post/:id" exact component={Post} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="/profile/:id" exact component={Profile} />
            <Route path="*" exact component={PageNotFound} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;

