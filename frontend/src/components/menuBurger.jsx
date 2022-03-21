/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import {slide as Menu} from "react-burger-menu";
import { AuthContext } from '../App';
import { BrowserRouter } from 'react-router-dom';
export default  props => {
  const storage = JSON.parse(localStorage.getItem('user'));
  const { state, dispatch } = React.useContext(AuthContext);
  return (
    <BrowserRouter>
        
    <nav >

      {state.isAuthenticated && (
        <div>
    <Menu {...props}>
      
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
    </Menu>
    </div>
        )}
      </nav>
    </BrowserRouter>
  );
};
