import React from 'react'
import "./topbar.css"
import { AuthContext } from "./../../App";
import { Search, Person, Chat, Notifications } from "@material-ui/icons"
import { Link, BrowserRouter, useParams, useHistory } from "react-router-dom"
import { useEffect, useState, Redirect } from "react";
import Home from './../../pages/home/Home';

import MenuIcon from "@material-ui/icons/Menu";
import { Component } from './../Component';
export default function Topbar() {
  const [isActive, setActive] = useState('false')
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  let history = useHistory();
  const { state, dispatch } = React.useContext(AuthContext);
  const storage = JSON.parse(localStorage.getItem('user'));
  // const  isAdmin = storage.isAmin;
  // const id = storage.id;
  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <BrowserRouter>
      <nav >
        {state.isAuthenticated && (
          <div>
            <div className="topbarContainer">

              <div className="topbarLeft">
       <Component/>
                <h1> GROUPOMANIA   </h1>

              </div>
      
              <button className="btn btn-outline-danger btn-sm" onClick={() => { history.push("/admin/" + state.user.id) }}>admin</button>
              <div className="topbarLinks">
                <button className="btn btn-outline-danger btn-sm" onClick={() => { history.push("/UpdateUser/" + state.user.id) }}>updateuser</button>
               

                <button className="btn btn-outline-danger btn-sm" onClick={() => { history.push("/profile/" + state.user.id) }}>profile</button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => { history.push("/mypost/" + state.user.id) }}>My Post</button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => { history.push("/") }}>home</button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => { history.push("/updateprofile/" + state.user.id) }}>update profile </button>
              </div>
              <div className="topbarIcons">
                <div className="topbarIconItem">
                  <Notifications />
                  <span className="topbarIconBadge">1</span>
                </div>
              </div>
              <span
                onClick={() =>
                  dispatch({
                    type: "X"
                  })
                }
              >
                <h1>Hi {state.user.username} (X) </h1>
              </span>
              {/* <img src={"http://localhost:8800/images/" +state.user.image} alt="" className="topbarImg" /> */}
            </div>
          </div>
        )}
      </nav>
    </BrowserRouter>
  );
}
