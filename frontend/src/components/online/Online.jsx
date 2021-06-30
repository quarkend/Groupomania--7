import React from 'react'
import "./online.css"
import { Users } from '../../dummyData';

export default function Oline(user) {
    return (
        <div>
            <li className="rightbarFriend">
                <div className="rightbarProfileImgContainer">
                    <img className="rightbarProfileImg" src={user.profilePicture} alt="" />
                    <span className="rightbarOnline"></span>
                </div>
                <span className="RightbarUsername">{user.username}</span>
            </li>
        </div>
    )
}
