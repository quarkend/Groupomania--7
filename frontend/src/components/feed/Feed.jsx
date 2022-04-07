import Share from '../share/Share'
import Post from '../post/Post'
import "./feed.css"
import React from 'react'
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
export default function Feed({ }) {
    const [Posts, setPosts] = useState([]);
    const [user, setUser] = useState([]);
    // let { id } = useParams();
    const storage = JSON.parse(localStorage.getItem('user'));
    const id = storage.id;
    let token = "Bearer " + storage.token;
    let history = useHistory();
    useEffect(() => {
        const fetchPosts = async () => {
            axios.get(`/posts`,
                {
                    headers: { Authorization :"Bearer" + token  }
                }).then((response) => {
                    setPosts(response.data)
                    localStorage.setItem(' setLtOfPtsbyuserId', JSON.stringify(response.data));
                });
        };
        fetchPosts();
    }, []);
    // useEffect(() => {
    //     const fetchUser = async () => {
    //         const res = await axios.get(`users/${id}`,
    //             {
    //                 headers:
    //                     { "Authorization": token }
    //             }
    //         );
    //         setUser(res.data);
    //         localStorage.setItem('userAccounxxt', JSON.stringify(res.data));
    //     };
    //     fetchUser();
    // }, [token, id]);
    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share />
                {Posts.map(p => (
                    <Post key={p.id} post={p} />
                ))}
            </div>
        </div>
    );
}
