import React from 'react'
import "./rightbar.css"
import { Users } from '../../DATA';
import Online from "../online/Online";


export default function Rightbar(profile) {
    const HomeRightbar = () => {
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
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">New York</span>

                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">Madrid</span>

                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">Singel</span>
                        <h4 className="rightbarTitle">User friernds </h4>
                        <div className="rightbarFollowings">
                            <div className="rightbarFollowing">
                                <img src="assets/person/1.jpeg" alt="" className="rightbarFollowingImg" />
                                <span className="rightbarFollowingName"> Janell Shrum </span>
                            </div>
                            <div className="rightbarFollowing">
                                <img src="assets/person/3.jpeg" alt="" className="rightbarFollowingImg" />
                                <span className="rightbarFollowingName"> Janell Shrum </span>
                            </div>
                            <div className="rightbarFollowing">
                                <img src="assets/person/4.jpeg" alt="" className="rightbarFollowingImg" />
                                <span className="rightbarFollowingName"> Janell Shrum </span>
                            </div>
                            <div className="rightbarFollowing">
                                <img src="assets/person/5.jpeg" alt="" className="rightbarFollowingImg" />
                                <span className="rightbarFollowingName"> Janell Shrum </span>
                            </div>
                        </div>
                    </div>



                </div>
            </div>)
    }

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {profile ? <ProfileRightbar /> : <HomeRightbar />}
                {/* <HomeRightbar/> */}
            </div>
        </div>
    );
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