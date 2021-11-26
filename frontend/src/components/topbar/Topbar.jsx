import React from 'react'
import "./topbar.css"
import { Search, Person, Chat, Notifications } from "@material-ui/icons"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
export default function Topbar() {
    const [username, setUsername] = useState({});
    const storage = localStorage.getItem("accessToken");
    const id = storage.userId;
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <span className="logo"><Link to="/">HOME</Link> </span>
                <span className="logo" ><Link to={`/profile/${id}`} >profile id</Link> </span>
                <span className="logo"><Link to="/CreatePost/">create post</Link> </span>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className="searchIcon" />
                    <input placeholder="Search for friend, post or video" className="searchInput" />

                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                    <span className="logo"><Link to="/post/:id">id create comment</Link> </span>
                </div>


                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBadge">2</span>

                    </div>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Chat />
                        <span className="topbarIconBadge">3</span>

                    </div>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">1</span>

                    </div>
                </div>
                <img src="/assets/person/2.jpeg" alt="" className="topbarImg" />
            </div>



        </div>


    );
}
