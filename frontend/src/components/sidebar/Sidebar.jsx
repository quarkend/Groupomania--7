import React from 'react'
import "./sidebar.css"
import { RssFeed, Chat, Group, PlayCircleFilled } from "@material-ui/icons";
// import { Users } from "../../DATA";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Online from "../online/Online";
// import CloseColleague from '../closeColleague/CloseColleague';
export default function Sidebar(user) {
    // // const [authState, setAuthState] = useState({
    // //     username: "",
    // //     id: 0,
    // //     status: false,
    // // });
    // // useEffect(() => {
    // //     axios
    // //         .get("/auth/auth", {
    // //             headers: {
    // //                 accessToken: localStorage.getItem("accessToken"),
    // //             },
    // //         })
    // //         .then((response) => {
    // //             if (response.data.error) {
    // //                 setAuthState({ ...authState, status: false });
    // //             } else {
    // //                 setAuthState({
    // //                     username: response.data.username,
    // //                     id: response.data.id,
    // //                     status: true,
    // //                 });
    // //             }
    // //         });
    // // }, []);
    // return (
    //     <div className="sidebar">
    //         <div className="sidebarWrapper">
    //             <ul className="sidebarList">
    //                 <li className="sidebarListItem">
    //                     <RssFeed className="sidebarIcon" />
    //                     <span className="sidebarListItemText">Feed</span>
    //                 </li>
    //                 <li className="sidebarListItem">
    //                     <Chat className="sidebarIcon" />
    //                     <span className="sidebarListItemText">Chat</span>
    //                 </li>
    //                 <li className="sidebarListItem">
    //                     <Group className="sidebarIcon" />
    //                     <span className="sidebarListItemText">Groups</span>
    //                 </li>
    //                 <li className="sidebarListItem">
    //                     <PlayCircleFilled className="sidebarIcon" />
    //                     <span className="sidebarListItemText">Videos</span>
    //                 </li>
    //             </ul>
    //             <button className="sidebarButton">Show More</button>
    //             <hr className="sidebarHr" />
    //             <ul className="sidebarColleagueList">
    //                 {/* {Users.map((u) => (
    //                     <CloseColleague key={u.id} user={u} />
    //                 ))} */}
    //                 {/* <h1>{authState.username} </h1> */}
    //             </ul>
    //         </div>
    //     </div>
    // )
    const storage = JSON.parse(localStorage.getItem('user'));
    const token = "Bearer " +JSON.parse(localStorage.getItem('token'));
    const id = storage.id;






    const HomeRightbar = () => {
   
        const [Users, setUsers] = useState([]);
        useEffect(() => {
            let componentMounted = true;
            let abortController = new AbortController(); 
            const fetchData = async () => { axios.get("http://localhost:8800/api/users").then((res) => {
                if(componentMounted) {
                    setUsers(res.data);
                  }
                console.log(res.data)
            })
        }

            // axios.get(`|http://http://localhost:8800/api/posts/byId/${id}`).then((res) => {
            //     setUsers(res.data)
            //     console.log(res.data)
            // })
        
              fetchData();
              return () => {
               componentMounted = false;
               abortController.abort();
              }
        }, []);
        return (
            <div>
                <div className="eventContainer">
                    <img className="eventImg" src="assets/gift.png" alt="" />
                    <span className="eventText"> <b>{storage.username}</b></span>
                </div>
                {/* <img className="rightbarAd" src="assets/ad.png" alt="" /> */}
                <h4 className="rightbarfTitle">On line friends</h4>
                <ul className="rightbarCsolleagueList">
                    {Users.map((u) => (
                        <Online key={u.id} user={u} />
                    ))}
                </ul>
            </div>
        );
    };
    // const ProfileRightbar = () => {
    //     const storage = JSON.parse(localStorage.getItem('user'));
    //     const id = storage.userId;
    //     let token = "Bearer " + storage.token;
    //     const [Users, setUsers] = useState([]);
    //     const [posts, setPosts] = useState([]);
    //     useEffect(() => {
    //         let componentMounted = true;
    //         let abortController = new AbortController(); 
    //         const fetchData = async () => {
    //             axios.get(`/users/${id}`,
    //             {
    //                 headers:
    //                     { "Authorization": token }
    //             }
    //         ).then((res) => {
    //             if(componentMounted) {
    //                 setUsers(res.data);
    //               }
    //             console.log(res.data)
    //         })
     
    // };
    // fetchData();
    // return () => {
    //  componentMounted = false;
    //  abortController.abort();
    // }
          
        
        
    //     }, [id, token]);
    //     return (
    //         <div>
    //             <h4 className="rightbarTitle">User Information </h4>
    //             <div className="rightbarInfo">
    //                 <div className="rightbarInfoItem">
    //                     <span className="rightbarInfoKey">City:</span>
    //                      <span className="rightbarInfoValue">{storage.city}</span> 
    //                 </div>
    //                 <div className="rightbarInfoItem">
    //                     <span className="rightbarInfoKey">From:</span>
    //                     <span className="rightbarInfoValue">{storage.from}</span> 
    //                 </div>
    //                 <div className="rightbarInfoItem">
    //                     <span className="rightbarInfoKey">Relationship:</span>
    //                     <span className="rightbarInfoValue">Singel</span>
    //                     <h4 className="rightbarTitle">User friernds </h4>
    //                     <div className="rightbarFollowings">
                    
                     
    //                         <div className="rightbarFollowing">
    //                             {/* <img src={"http://localhost:8800/images/"  + storage.profilePicture} alt="" className="rightbarFollowingImg" /> */}
                          
    //                             <span className="rightbarFollowingName"> {storage.username}</span>
    //                         </div> 
          
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>)
    // }
    return (
        <div className="sidebar">
               <div className="sidebarWrapper">
             {/* {user ? <HomeRightbar /> : <ProfileRightbar />}   */}
                {/* <ProfileRightbar /> */}
                 <HomeRightbar /> 
         
            </div>
        </div>
    );
}
