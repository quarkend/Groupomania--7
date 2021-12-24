import React from 'react'
import "./sidebar.css"
import { RssFeed, Chat, Group, PlayCircleFilled } from "@material-ui/icons";
// import { Users } from "../../DATA";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CloseFriend from '../closeFriend/CloseFriend';

export default function Sidebar() {
    // const [authState, setAuthState] = useState({
    //     username: "",
    //     id: 0,
    //     status: false,
    // });

    // useEffect(() => {
    //     axios
    //         .get("/auth/auth", {
    //             headers: {
    //                 accessToken: localStorage.getItem("accessToken"),
    //             },
    //         })
    //         .then((response) => {
    //             if (response.data.error) {
    //                 setAuthState({ ...authState, status: false });
    //             } else {
    //                 setAuthState({
    //                     username: response.data.username,
    //                     id: response.data.id,
    //                     status: true,
    //                 });
    //             }
    //         });
    // }, []);



    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed className="sidebarIcon" />
                        <span className="sidebarListItemText">Feed</span>
                    </li>

                    <li className="sidebarListItem">
                        <Chat className="sidebarIcon" />
                        <span className="sidebarListItemText">Chat</span>
                    </li>

                    <li className="sidebarListItem">
                        <Group className="sidebarIcon" />
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                    <li className="sidebarListItem">
                        <PlayCircleFilled className="sidebarIcon" />
                        <span className="sidebarListItemText">Videos</span>
                    </li>





                </ul>
                <button className="sidebarButton">Show More</button>
                <hr className="sidebarHr" />
                <ul className="sidebarFriendList">
                    {/* {Users.map((u) => (
                        <CloseFriend key={u.id} user={u} />
                    ))} */}
                    {/* <h1>{authState.username} </h1> */}


                </ul>
            </div>
        </div>
    )
}
