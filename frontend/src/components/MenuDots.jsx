/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import {slide as Menu} from "react-burger-menu";
import  "./topbar/topbar.css";    
import { MoreHoriz, MoreVert } from '@material-ui/icons';
import { AuthContext } from './../App';

import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { Link, BrowserRouter, useParams, useHistory,render } from "react-router-dom"

import  "./topbar/topbar.css";    

export default  props => {


  
 

  const { state, dispatch } = React.useContext(AuthContext);
  const storage = JSON.parse(localStorage.getItem('user'));
  const [open, setOpen] = useState(false);
  const container = useRef(null);
  
  const handleClickOutside = event => {
    if (container.current && !container.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className="container" ref={container}>

    <MoreVert  onClick={() => setOpen(!open)}{...props}/>
    {open && (
       <div >
      <div class="dropdown-wrapper">
        <ul class="dropdown-menu">
          <li><a class="dropdown-menu__item" href="/"> Home</a></li>
    

 
    
          <li><a className="dropdown-menu__item" href={"/profile/" + storage.id}>
    Profile
    </a> </li>
    <li> <a className="dropdown-menu__item" href={"/admin/" + state.user.id}>
    admin
    </a> </li>
    <li><a className="dropdown-menu__item" href={"/" + state.user.id}>
    Hi {state.user.username} (X)
    </a> </li>


    <li className="dropdown-menu__item" >Hi {state.user.username} (X) </li>
    <span className="dropdown-menu__item" 
                onClick={() =>
                  dispatch({
                    type: "X"
                  })
                }
              >
                deco
               
              </span>
   
    </ul>
    </div>
        </div>
      )}
    </div>
  );
};







