import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

import "./profile.css"
import Topbar from "../../components/topbar/Topbar"
// import Sidebar from "../../components/sidebar/Sidebar"
import Feed from "../../components/feed/Feed"
// import Rightbar from "../../components/rightbar/Rightbar"
import { AuthContext } from './../../helpers/AuthContext';

export default function Profile() {
    let { id } = useParams();
    let history = useHistory();
    const [username, setUsername] = useState("");
    const [listOfPosts, setListOfPosts] = useState([]);
    const { authState } = useContext(AuthContext);
    useEffect(() => {
        axios.get(`http://localhost:3001/auth/basicInfo/${id}`).then((response) => {
            setUsername(response.data.username);
        });

        axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
            setListOfPosts(response.data);
        });
    }, []);

    return (

        <div className="profilePageContainer">
            <Topbar />
            <div className="profile">

                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img className="profileCoverImg" src="assets/post/3.jpeg" alt="" />
                            <img className="profileUserImg" src="assets/person/2.jpeg" alt="" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{authState.username} </h4>
                            <span className="profileInfoDesc">hello my friend</span>
                        </div>

                    </div>
                    <div className="profileRightBottom">
                        <Feed />

                    </div>

                </div>
            </div>

            <div className="basicInfo">
                {" "}
                <h1> Username: {username} </h1>
                {authState.username === username && (
                    <button
                        onClick={() => {
                            history.push("/changepassword");
                        }}
                    >
                        {" "}
                        Change My Password
                    </button>
                )}
            </div>
            <div className="listOfPosts">
                {listOfPosts.map((value, key) => {
                    return (
                        <div key={key} className="post">
                            <div className="title"> {value.title} </div>
                            <div
                                className="body"
                                onClick={() => {
                                    history.push(`/post/${value.id}`);
                                }}
                            >
                                {value.postText}
                            </div>
                            <div className="footer">
                                <div className="username">{value.username}</div>
                                <div className="buttons">
                                    <label> {value.Likes.length}</label>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}