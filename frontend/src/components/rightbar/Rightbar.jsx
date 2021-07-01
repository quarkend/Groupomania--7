import React from 'react'
import "./rightbar.css"
import { Users } from '../../dummyData';
import Online from "../online/Online";


export default function Rightbar(profile) {
    const HomeRightBar = () => {
        return (
            <div>
                <div className="birthdayContainer">
                    <img className="birthdayImg" src="assets/gift.png" alt="" />
                    <span className="birthdayText"> <b>pol fost</b>  and 2 have birthday today</span>
                </div>
                <img className="rightbarAd" src="assets/ad.png" alt="" />
                <h4 className="rightbarTitle">On line friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map((u) => (
                        <Online key={u.id} user={u} />
                    ))}


                </ul>
            </div>
        );
    };
    const ProfileRightbar = () => {
        return (
            <div>
                <h4 className="rightbarTitle">User Information </h4>
                <div class="rightbarInfo">
                    <div class="rightbarInfoItem">
                        <span class="rightbarInfoKey">City:</span>
                        <span class="rightbarInfoValue">New York</span>

                    </div>
                    <div class="rightbarInfoItem">
                        <span class="rightbarInfoKey">From:</span>
                        <span class="rightbarInfoValue">Madrid</span>

                    </div>
                    <div class="rightbarInfoItem">
                        <span class="rightbarInfoKey">Relationship:</span>
                        <span class="rightbarInfoValue">Singel</span>
                        <h4 className="rightbarTitle">User friernds </h4>
                        <div class="rightbarFollowings">
                            <div class="rightbarFollowing">
                                <img src="assets/person/1.jpeg" alt="" class="rightbarFollowingImg" />
                                <span class="rightbarFollowingName"> Janell Shrum </span>
                            </div>
                            <div class="rightbarFollowing">
                                <img src="assets/person/3.jpeg" alt="" class="rightbarFollowingImg" />
                                <span class="rightbarFollowingName"> Janell Shrum </span>
                            </div>
                            <div class="rightbarFollowing">
                                <img src="assets/person/4.jpeg" alt="" class="rightbarFollowingImg" />
                                <span class="rightbarFollowingName"> Janell Shrum </span>
                            </div>
                            <div class="rightbarFollowing">
                                <img src="assets/person/5.jpeg" alt="" class="rightbarFollowingImg" />
                                <span class="rightbarFollowingName"> Janell Shrum </span>
                            </div>
                        </div>
                    </div>



                </div>
            </div>)
    }

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                <ProfileRightbar />
                {/* <HomeRightbar/> */}
            </div>
        </div>
    )
}
        // <div className="birthdayContainer">
        //             <img className="birthdayImg" src="assets/gift.png" alt="" />
        //             <span className="birthdayText"> <b>pol fost</b>  and 2 have birthday today</span>
        //         </div>
        //         <img className="rightbarAd" src="assets/ad.png" alt="" />
        //         <h4 className="rightbarTitle">On line friends</h4>
        //         <ul className="rightbarFriendList">
        //             {Users.map((u) => (
        //                 <Online key={u.id} user={u} />
        //             ))}


        //         </ul>