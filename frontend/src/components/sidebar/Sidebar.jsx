import React from 'react'
import "./sidebar.css"
import { RssFeed, Chat, Group, PlayCircleFilled } from "@material-ui/icons";
import { Users } from "../../dummyData";

import CloseFriend from '../closeFriend/CloseFriend';

export default function Sidebar() {
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
                    {Users.map((u) => (
                        <CloseFriend key={u.id} user={u} />
                    ))}

                </ul>
            </div>
        </div>
    )
}
