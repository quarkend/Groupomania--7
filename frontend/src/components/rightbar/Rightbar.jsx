import React from 'react'
import "./rightbar.css"

export default function Rightbar() {
    return (
        <div className="rightbar">
            <div class="rightbarWrapper">
                <div class="birthdayContainer">
                    <img className="birthdayImg" src="assets/birthday.jpg" alt="" />
                    <span className="birthdayText"> <b>pol fost</b>  and 2 have birthday today</span>
                </div>
                <img className="rightbarAd" src="assets/birthday.jpg" alt="" />
                <h4 class="rightbarTitle">On line friends</h4>
                <ul class="rightbarFriendList">
                    <li class="rightbarFriend">
                        <div className="rightbarProfileImgContainer">
                            <img className="rightbarProfileImg" src="assets/person/4.jpg" alt="" />
                            <span className="rightbarOnline"></span>
                        </div>
                        <span class="RightbarUsername"> Mana Shana</span>
                    </li>
                    <li class="rightbarFriend">
                        <div className="rightbarProfileImgContainer">
                            <img className="rightbarProfileImg" src="assets/person/1.jpg" alt="" />
                            <span className="rightbarOnline"></span>
                        </div>
                        <span class="RightbarUsername"> greger</span>
                    </li>
                    <li class="rightbarFriend">
                        <div className="rightbarProfileImgContainer">
                            <img className="rightbarProfileImg" src="assets/person/6.jpg" alt="" />
                            <span className="rightbarOnline"></span>
                        </div>
                        <span class="RightbarUsername"> land</span>
                    </li>
                    <li class="rightbarFriend">
                        <div className="rightbarProfileImgContainer">
                            <img className="rightbarProfileImg" src="assets/person/21.jpg" alt="" />
                            <span className="rightbarOnline"></span>
                        </div>
                        <span class="RightbarUsername"> abdel</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
