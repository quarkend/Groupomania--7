
import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";

import Topbar from "../../components/topbar/Topbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Feed from "../../components/feed/Feed"
import Rightbar from "../../components/rightbar/Rightbar"
import "./home.css"
import { AuthContext } from './../../helpers/AuthContext';
function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);


    const { authState } = useContext(AuthContext);
    let history = useHistory();


    return (

        <div>
            <div className="kontainer">

                <Topbar />
                <div className="homeContainer">
                    <Sidebar />
                    <Feed />
                    <Rightbar />
                </div>

            </div>
            {listOfPosts.map((value, key) => {
                return (
                    <div key={key} className="post">
                        <Feed />


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
                            <div className="username">
                                <Link to={`/profile/${value.UserId}`}> {value.username} </Link>
                            </div>
                            <div className="buttons">


                                <label> {value.Likes.length}</label>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Home;




// export default function Home() {
//     return (

//         <div className="kontainer">

//             <Topbar />
//             <div className="homeContainer">
//                 <Sidebar />
//                 <Feed />
//                 <Rightbar />
//             </div>

//         </div>

//     );
// }

