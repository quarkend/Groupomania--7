import React from 'react'
import "./topbar.css"
import { CgMenuGridO } from 'react-icons/fa';
import { AuthContext } from "./../../App";
import { Search, Person, Chat, Notifications } from "@material-ui/icons"
import { Link, BrowserRouter, useParams, useHistory } from "react-router-dom"
import { useEffect, useState, Redirect } from "react";
import Home from './../../pages/home/Home';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from "@material-ui/icons/Menu";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { Component } from './../Component';
import MenuBurger from '../MenuBurger';

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
               <MenuBurger/>
            <div className="topbarContainer">
          
         
              <div className="topbarLeft">
         
              <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Rechercher sur Groupomania"
            className="searchInput"
          />
        </div>
     

              </div>
              <div className="topbarCenter">
              <div className="topbarIcons">
              <div className="topbarIcon">
            <HomeIcon  onClick={() => { history.push("/") }}/>
           
          </div>
  <div className="topbarIcon">
              <SupervisorAccountIcon onClick={() => { history.push("/admin/" + state.user.id) }}/>
              </div>
    
          <div className="topbarIconItem">
          <PostAddIcon onClick={() => { history.push("/mypost/" + state.user.id) }}/>
          </div>
      </div>
      </div>
             
              {/* <div className="topbarLinks"> */}
                {/* <button className="btn btn-outline-danger btn-sm" onClick={() => { history.push("/UpdateUser/" + state.user.id) }}>updateuser</button> */}
               

                
             
     
                {/* <button className="btn btn-outline-danger btn-sm" onClick={() => { history.push("/updateprofile/" + state.user.id) }}>update profile </button> */}
              {/* </div> */}


              <div className="topbarIcons">
              <div className="topbarIcon">
            <Person />
    
          </div>
            
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>        <div className="topbarIcons">
  
          <div className="topbarIconItem">
          <img src={"http://localhost:8800/images/" +state.user.profilePicture} alt="" className="topbarImg"  onClick={() => { history.push("/profile/" + state.user.id) }} /> 
        <span className="topbarLinks">{state.user.username}  </span>  
          </div>
          <div className="topbarIconItem">
            < MenuIcon/>
        
          </div>
        </div>
              <div className="topbarIcons">
                 
                <div className="topbarIconItem">
                  <img src="http://localhost:8800/images/dots-menu.png"  alt="" className="topbarIcon" />  
                
                </div>
              </div>

              <span
                onClick={() =>
                  dispatch({
                    type: "X"
                  })
                }
              >
               
              </span>
             
             
            </div>
            
          </div>
        )}
      </nav>
    </BrowserRouter>
  );
}
