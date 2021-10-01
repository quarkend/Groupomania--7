
import Share from '../share/Share'
import Post from '../post/Post'
import "./feed.css"
import { Posts } from '../../dummyData'
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { AuthContext } from './../../helpers/AuthContext';
import { Link, useHistory } from "react-router-dom";

export default function Feed({ username }) {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);
    // const [listOfPosts, setListOfPosts] = useState([]);
    // const [likedPosts, setLikedPosts] = useState([]);

    // const { authState } = useContext(AuthContext);
    // let history = useHistory();
    // useEffect(() => {
    //     if (!localStorage.getItem("accessToken")) {
    //         history.push("/login");
    //     } else {
    //         axios
    //             .get("http://localhost:3001/posts", {
    //                 headers: { accessToken: localStorage.getItem("accessToken") },
    //             })
    //             .then((response) => {
    //                 setListOfPosts(response.data.listOfPosts);
    //                 setLikedPosts(
    //                     response.data.likedPosts.map((like) => {
    //                         return like.PostId;
    //                     })
    //                 );
    //             });
    //     }
    // }, []);
    useEffect(() => {
        const fetchPosts = async () => {
            const res = username
                ? await axios.get("/posts/profile/" + username)
                : await axios.get("posts/" + 1);
            setPosts(
                res.data.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
            );
        };
        fetchPosts();
    }, []);
    return (
        <div className="feed">
            <div className="feedWrapper">
                {(!username || username === user.username) && <Post />}
                {posts.map((p) => (
                    <Post key={p._id} post={p} />
                ))}
            </div>
        </div>
        // <div className="feed">
        //     <div className="feedWrapper">
        //         <Share />
        //         {listOfPosts.map((value, key) => {
        //             return (
        //                 <div key={key} className="post">

        //                     {listOfPosts.map(p => (
        //                         <Post key={p.id} post={p} />
        //                     ))}

        //                     <div className="title"> {value.title} </div>
        //                     <div
        //                         className="body"
        //                         onClick={() => {
        //                             history.push(`/post/${value.id}`);
        //                         }}
        //                     >
        //                         {value.postText}
        //                     </div>
        //                     <div className="footer">
        //                         <div className="username">
        //                             <Link to={`/profile/${value.UserId}`}> {value.username} </Link>
        //                         </div>
        //                         <div className="buttons">
        //                             <ThumbUpAltIcon

        //                                 className={
        //                                     likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"
        //                                 }
        //                             />

        //                             <label> {value.Likes.length}</label>
        //                         </div>
        //                     </div>
        //                 </div>
        //             );
        //         })}


        //     </div>
        // </div>
    );
}
