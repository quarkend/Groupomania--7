import React from 'react'
import "./topbar.css"

import { AuthContext } from "./../../App";

import { Link, BrowserRouter, useParams, useHistory } from "react-router-dom"
import { useEffect, useState, Redirect } from "react";
import Home from './../../pages/home/Home';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from "@material-ui/icons/Menu";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PostAddIcon from '@material-ui/icons/PostAdd';

import MenuBurger from '../MenuBurger';


export default function Topbar() {
  const [isActive, setActive] = useState('false')
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  let history = useHistory();
  const { state, dispatch } = React.useContext(AuthContext);
  const storage = JSON.parse(localStorage.getItem('userAount'));
  // const  isAdmin = storage.isAmin;
  // const id = storage.id;
  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <BrowserRouter>

      <nav  >

        {state.isAuthenticated && (
          <div>

            <div className="topbarContainer">
              <h1 className="topbar-title">Groupomania</h1>
              <div className="topbarLeft">

                <div className="searchbar">
   
                </div>



              </div>
              <div className="topbarCenter">



              </div>

    


              <div className="topbarIcons">
          
                  <div className="topbarIcon">
                    <HomeIcon onClick={() => { history.push("/") }} />

                  </div>
                  <div className="topbarIconItem">
                    <SupervisorAccountIcon onClick={() => { history.push("/admin/" + state.user.id) }} />
                    {/* <span className="topbarIconBadge">{storage.length}</span> */}
                  </div>

                  {/* <div className="topbarIconItem">
                  <Chat />
                  </div> */}
         
                {/* <div className="topbarIcon">
                  <Person />

                </div> */}

                <div className="topbarIconItem">
            
     
           
          </div>
                {/* <div className="topbarIconItem">
                  <Notifications />
                  <span className="topbarIconBadge">1</span>
                </div> */}
              </div>        <div className="topbarIcons">

                <div className="topbarIconItem">
                  <img src={"http://localhost:8800/images/" + state.user.profilePicture} alt="" className="topbarImg" onClick={() => { history.push("/profile/" + state.user.id) }} />
                  <span className="topbarLinks">{state.user.username}  </span>
                </div>
                <div className="topbarIconItem">
                  <MenuBurger />

                </div>
              </div>





            </div>

          </div>
        )}
      </nav>
    </BrowserRouter>
  );
}
