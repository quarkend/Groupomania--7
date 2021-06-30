import React from 'react'
import "./profile.css"
import Topbar from "../../components/topbar/Topbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Feed from "../../components/feed/Feed"
import Rightbar from "../../components/rightbar/Rightbar"

export default function Profile() {
    return (
        <div className="kontainer">

            <Topbar />
            <div className="profile">
                <Sidebar />
                <div class="profileRight">
                    <div class="profileRightTop">eth v</div>
                    <div class="profileRightBottom">
                        <Feed />
                        <Rightbar />
                    </div>

                </div>
            </div>

        </div>
    )
}
