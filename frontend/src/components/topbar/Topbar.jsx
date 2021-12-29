import React from 'react'
import "./topbar.css"
import { AuthContext } from "./../../App";
import { Search, Person, Chat, Notifications } from "@material-ui/icons"
import { Link, BrowserRouter  } from "react-router-dom"
import { useEffect, useState , Redirect } from "react";
import Home from './../../pages/home/Home';
export default function Topbar() {
  const { state, dispatch } = React.useContext(AuthContext);
    const user = JSON.parse(localStorage.getItem('user'));
 
   
   
    return (
      <BrowserRouter>
        <nav >
     
         {state.isAuthenticated && (
           
      <div>
        <div className="topbarContainer">
            <div className="topbarLeft">
           
    <Link to="./" > <h1> GROUPOMANIA   </h1>
</Link>
    
               
            </div>
           
     
                <div className="topbarLinks">
                
                  
                   
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
                <img src={"http://localhost:8800/images/" + user.profilePicture} alt="" className="topbarImg" />
            </div>
            <img className="postProfileImg"
                            src={"http://localhost:8800/images/" + user.profilePicture}
                            alt="user"

                        />


        </div>
        
    )}
       </nav>
        </BrowserRouter>
        

    );
}
