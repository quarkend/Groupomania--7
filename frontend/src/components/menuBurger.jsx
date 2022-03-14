/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import {slide as Menu} from "react-burger-menu";
export default  props => {
  const storage = JSON.parse(localStorage.getItem('user'));
  return (
    <Menu {...props}>
    <a className="menu-item" href="/">
    Home
    </a>
    <a className="menu-item" href={"/profile/" + storage.id}>
    Profile
    </a>
    <a className="menu-item" href="/">
   Update Profile
    </a>
    </Menu>
  );
};
