import Share from '../share/Share'
import Post from '../post/Post'
import "./feed.css"
import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
export default function Feed({ post }) {
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
                <Share />
                {Posts.map((post) => {
                    if (post.userId === storage.id) {
                        return (
                            <Post key={post.id} post={post} />
                        )
                    } else {
                        return null
                    }
                })}
            </div>
        </div>
    );
}
