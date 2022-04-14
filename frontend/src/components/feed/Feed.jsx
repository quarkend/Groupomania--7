import Share from '../share/Share'
import Post from '../post/Post'
import "./feed.css"
import React from 'react'
import axios from "axios";
import {useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { AuthContext } from './../context/auth.context';
export default function Feed({ username }) {
    const {user} = useContext(AuthContext);
    const [Posts, setPosts] = useState([]);
    const storage = JSON.parse(localStorage.getItem('user'));
    const id = storage.id;
    let token = "Bearer " + storage.token;
   useEffect(() => {
        const fetchPosts = async () => {
            axios.get(`/posts`,
                {
                    headers: { Authorization: "Bearer" + token }
                }).then((response) => {
                    setPosts(response.data)
                    localStorage.setItem(' setLtOfPtsbyuserId', JSON.stringify(response.data));
                });
        };
        fetchPosts();
    }, []);
   return (
    <div className="feed">
    <div className="feedWrapper">
      {(!username || username === user.username) && <Share />}
      {Posts.map((p) => (
        <Post key={p.id} post={p} />
      ))}
    </div>
  </div>
    );
}
{/* <div className="feed">
<div className="feedWrapper">
    <Share />
    {/* {Posts.map(p => (
        <Post key={p.id} post={p} />
    ))} */}
//     {Posts.map((post) => {
//         if (post.userId === storage.id) {
//             return (
//                 <Post key={post.id} post={post} />
//             )
//         } else {
//             return null
//         }
//     })}
// </div>
// </div> */}