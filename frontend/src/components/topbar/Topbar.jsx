import React from 'react'
import "./topbar.css"
import { Search, Person, Chat, Notifications } from "@material-ui/icons"


export default function Topbar() {
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <span className="logo">Groupomania</span>
            </div>
            <div className="topbarCenter">
                <div class="searchbar">
                    <Search className="searchIcon" />
                    <input placeholder="Search for friend, post or video" className="searchInput" />

                </div>
            </div>
            <div className="topbarRight">
                <div class="topbarLinks">
                    <span class="topbarLink">Homepage</span>
                    <span class="topbarLink">Timeline</span>
                </div>


                <div class="topbarIcons">
                    <div class="topbarIconItem">
                        <Person />
                        <span class="topbarIconBadge">2</span>

                    </div>
                </div>
                <div class="topbarIcons">
                    <div class="topbarIconItem">
                        <Chat />
                        <span class="topbarIconBadge">3</span>

                    </div>
                </div>
                <div class="topbarIcons">
                    <div class="topbarIconItem">
                        <Notifications />
                        <span class="topbarIconBadge">1</span>

                    </div>
                </div>
                <img src="/assets/person/6.jpg" alt="" className="topbarImg" />
            </div>



        </div>


    );
}
