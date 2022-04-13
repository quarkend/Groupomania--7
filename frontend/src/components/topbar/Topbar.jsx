import React, { useEffect, useState, useContext } from 'react';
import "./topbar.css"

import { AuthContext } from "./../../App";

import {  BrowserRouter,  useHistory ,useParams} from "react-router-dom"


import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from "@material-ui/icons/Menu";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PostAddIcon from '@material-ui/icons/PostAdd';

import MenuBurger from '../MenuBurger';


export default function Topbar() {
const url = "http://localhost:8800/images/";
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  let history = useHistory();
  const { state, dispatch } = React.useContext(AuthContext);
  const storage = JSON.parse(localStorage.getItem('user'));
  const token = "Bearer " +JSON.parse(localStorage.getItem('token'));
  const [data, setData] = useState('')
  const {user} = useContext(AuthContext);

  let id= useParams();
  // const  isAdmin = storage.isAmin;

  async function getUserData() {
    const URL = `${"/users/"}/${id}`
    const data = await fetch(URL, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    const response = await data.json()
    setData(response)
    console.log(response)

        setIsLoaded(true);
        setError(error);
    
}
useEffect(() => {
    getUserData()
   
}, [])

  return (
    <BrowserRouter>

      <nav  >

        {state.isAuthenticated && (
          <div>

            <div className="topbarContainer">
          
              <div className="topbarLeft">
                
              <img className="topbarIco"src="http://localhost:8800/images/icon-left-font-monochrome-black.PNG" onClick={() => { history.push("/")}}/>
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
                    <SupervisorAccountIcon onClick={() => { history.push("/admin/" + storage.id) }} />
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
              {/* {"http://localhost:8800/images/" + data.profilePicture}  */}
              
                <div className="topbarIconItem">
                  <img src={
                            state.user.profilePicture
                                ? url + state.user.profilePicture
                                : url + "noAvatar.png"
                        }       alt="" className="topbarImg" onClick={() => { history.push("/profile/" + state.user.id) }} />
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
