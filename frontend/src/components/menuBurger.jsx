/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import {useRef,useState} from 'react'
import {slide as Menu} from "react-burger-menu";
import { AuthContext } from '../App';
import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
 import  "./topbar/topbar.css";   
import "./search/search.css" 
import MenuIcon from "@material-ui/icons/Menu";
export default  props => {
  const storage = JSON.parse(localStorage.getItem('user'));
  const { state, dispatch } = React.useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const dropdownwrapper = useRef(null);
  
  const handleClickOutside = event => {
    if(dropdownwrapper.current && !dropdownwrapper.current.contains(event.target)){
      setOpen(false);
    }
  }
  useEffect(() =>{
    document.addEventListener("mousedown",handleClickOutside);
    return ()=> {
      // clean
      document.removeEventListener("mousedown", handleClickOutside)
    }
  })
  return (
 
        
    <div className = "dropdownwrapper" ref = {dropdownwrapper}>
    <MenuIcon onClick={() => setOpen(!open)}{...props}/>
      {open && (
        <div>
    <div className="dropdpper">
        <ul className="modal">
      
    <a className="menu-item" href="/">
    Home
    </a>
    <a className="menu-item" href={"/profile/" + state.user.id}>
    Profile de {state.user.username}
    </a>
    <a className="menu-item" href={"/admin/" + state.user.id}>
    admin
    </a>
    <a className="menu-item" href={"/UpdateUser/" + state.user.id }>
Update User
    </a> 

    <a className="menu-item" href={"/Updateprofile/" + state.user.id }>
Update Profile
    </a> 
   
    <a className="menu-item" href={"/" }
                onClick={() =>
                  dispatch({
                    type: "X"
                  })
                }
              >
                deconexion
               
              </a>
              </ul>
    </div>
    </div>
        )}
      </div>
    
  );
};
