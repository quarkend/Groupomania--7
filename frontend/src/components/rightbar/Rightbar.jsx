import React from 'react'
import "./rightbar.css"
import { Users } from '../../dummyData';
import Online from "../online/Online";
export default function Rightbar() {
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
                    {Users.map((u) => (
                        <Online key={u.id} user={u} />
                    ))}


                </ul>
            </div>
        </div>
    )
}
