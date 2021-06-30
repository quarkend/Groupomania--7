import React from 'react'
import "./rightbar.css"
import { Users } from '../../dummyData';

export default function Rightbar(user) {
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                <div className="birthdayContainer">
                    <img className="birthdayImg" src="assets/birthday.jpg" alt="" />
                    <span className="birthdayText"> <b>pol fost</b>  and 2 have birthday today</span>
                </div>
                <img className="rightbarAd" src="assets/birthday.jpg" alt="" />
                <h4 className="rightbarTitle">On line friends</h4>
                <ul className="rightbarFriendList">
                    <li className="rightbarFriend">
                        <div className="rightbarProfileImgContainer">
                            <img className="rightbarProfileImg" src={user.profilePicture} alt="" />
                            <span className="rightbarOnline"></span>
                        </div>
                        <span className="RightbarUsername"> {user.username}</span>
                    </li>


                </ul>
            </div>
        </div>
    )
}
