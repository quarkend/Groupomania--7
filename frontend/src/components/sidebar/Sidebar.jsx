import React from 'react'
import "./sidebar.css"
import { RssFeed, Chat, Group, PlayCircleFilled } from "@material-ui/icons";

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
                    <li className="sidebarFriend">
                        <img className="sidebarFriendImg" src="/assets/person/6.jpg" alt="" />
                        <span className="sidebarFriendName">Hinafi Yassir</span>
                    </li>
                    <li className="sidebarFriend">
                        <img className="sidebarFriendImg" src="/assets/person/6.jpg" alt="" />
                        <span className="sidebarFriendName">Hinafi Yassir</span>
                    </li>
                    <li className="sidebarFriend">
                        <img className="sidebarFriendImg" src="/assets/person/6.jpg" alt="" />
                        <span className="sidebarFriendName">Hinafi Yassir</span>
                    </li>
                    <li className="sidebarFriend">
                        <img className="sidebarFriendImg" src="/assets/person/6.jpg" alt="" />
                        <span className="sidebarFriendName">Hinafi Yassir</span>
                    </li>
                    <li className="sidebarFriend">
                        <img className="sidebarFriendImg" src="/assets/person/6.jpg" alt="" />
                        <span className="sidebarFriendName">Hinafi Yassir</span>
                    </li>
                    <li className="sidebarFriend">
                        <img className="sidebarFriendImg" src="/assets/person/6.jpg" alt="" />
                        <span className="sidebarFriendName">Hinafi Yassir</span>
                    </li>
                    <li className="sidebarFriend">
                        <img className="sidebarFriendImg" src="/assets/person/6.jpg" alt="" />
                        <span className="sidebarFriendName">Hinafi Yassir</span>
                    </li>
                    <li className="sidebarFriend">
                        <img className="sidebarFriendImg" src="/assets/person/6.jpg" alt="" />
                        <span className="sidebarFriendName">Hinafi Yassir</span>
                    </li>
                    <li className="sidebarFriend">
                        <img className="sidebarFriendImg" src="/assets/person/6.jpg" alt="" />
                        <span className="sidebarFriendName">Hinafi Yassir</span>
                    </li>
                    <li className="sidebarFriend">
                        <img className="sidebarFriendImg" src="/assets/person/6.jpg" alt="" />
                        <span className="sidebarFriendName">Hinafi Yassir</span>
                    </li>
                    <li className="sidebarFriend">
                        <img className="sidebarFriendImg" src="/assets/person/6.jpg" alt="" />
                        <span className="sidebarFriendName">Hinafi Yassir</span>
                    </li>
                    <li className="sidebarFriend">
                        <img className="sidebarFriendImg" src="/assets/person/6.jpg" alt="" />
                        <span className="sidebarFriendName">Hinafi Yassir</span>
                    </li>Name
                    <li className="sidebarFriend">
                        <img className="sidebarFriendImg" src="/assets/person/6.jpg" alt="" />
                        <span className="sidebarFriendName">Hinafi Yassir</span>
                    </li>
                    <li className="sidebarFriend">
                        <img className="sidebarFriendImg" src="/assets/person/6.jpg" alt="" />
                        <span className="sidebarFriendName">Hinafi Yassir</span>
                    </li>
                    <li className="sidebarFriend">
                        <img className="sidebarFriendImg" src="/assets/person/6.jpg" alt="" />
                        <span className="sidebarFriendName">Hinafi Yassir</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
