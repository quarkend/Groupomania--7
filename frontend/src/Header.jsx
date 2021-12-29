import React from "react";
import { AuthContext } from "./App";
import { Link } from "react-router-dom"
import { Search, Person, Chat, Notifications } from "@material-ui/icons"
import { BrowserRouter } from 'react-router-dom';

export const Topbar = () => {
  const { state, dispatch } = React.useContext(AuthContext);
  return (
    <BrowserRouter>
    <nav id="navigation">
      <h1 href="#" className="logo">
        HOOKED
      </h1>
      <button
        onClick={() =>
          dispatch({
            type: "LOGOUT"
          })
        }
      >
        {state.isAuthenticated && (
          <div><h1>Hi {state.user.username} (LOGOUT)</h1>
          <span className="logo" ><Link to={`/profile/${state.user.username}`} >profile </Link> </span>
          </div>
        )}
      </button>
    </nav>
    </BrowserRouter>
  );
};


export default Topbar;

