import React from 'react'
import "./online.css"


export default function Oline({ user }) {
    return (
        <div>
            <li className="rightbarFriend">
                <div className="rightbarProfileImgContainer">
                    <img className="rightbarProfileImg" src=""alt="" />
                    <span className="rightbarOnline"></span>
                </div>
                <span className="RightbarUsername">{user.username}</span>
            </li>
        </div>
    )
}
