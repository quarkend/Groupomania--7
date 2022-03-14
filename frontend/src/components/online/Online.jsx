import React from 'react'
import "./online.css"
export default function Online({ user }) {
    return (
        <div>
            <li className="rightbarColleague">
                <div className="rightbarProfileImgContainer">
                    <img className="rightbarProfileImg" src={"http://localhost:8800/images/" + user.image}alt="" />
                    <span className="rightbarOnline"></span>
                </div>
                <span className="RightbarUsername">{user.username}</span>
            </li>
        </div>
    )
}
