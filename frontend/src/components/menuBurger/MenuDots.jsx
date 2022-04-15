/* eslint-disable import/no-anonymous-default-export */
import React from 'react'

import {  MoreVert } from '@material-ui/icons';
import { AuthContext } from '../../App';

import { useState, useEffect  } from 'react';
import { useRef } from 'react';

export default  props => {
 const { state, dispatch } = React.useContext(AuthContext);
 const [open, setOpen] = useState(false);
  const dropdownwrapper = useRef(null);
 const handleClickOutside = event => {
    if (dropdownwrapper.current && !dropdownwrapper.current.contains(event.target)) {
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
    <div className="dropdownwrapper" ref={dropdownwrapper}>
   <MoreVert  onClick={() => setOpen(!open)}{...props}/>
    {open && (
       <div >
      <div className="dropdown-wrapper">
        <ul className="dropdown-menu">
          <li><a className="dropdown-menu__item" href="/"> Home</a></li>
   <li> <a className="dropdown-menu__item" href={"/admin/" + state.user.id}>
    admin
    </a> </li>
   <li className="dropdown-menu__item" >Hi {state.user.username} (X) </li>
    <li className="dropdown-menu__item" 
                onClick={() =>
                  dispatch({
                    type: "X"
                  })
                }
              >
                Deconexion
             </li>
   </ul>
    </div>
        </div>
      )}
    </div>
 );
};







