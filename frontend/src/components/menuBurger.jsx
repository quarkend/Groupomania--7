/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import {slide as Menu} from "react-burger-menu";
export default  props => {
  return (
    <Menu {...props}>
    <a className="menu-item" href="/">
    menuBurger
    </a>
   
    </Menu>
  );
};
