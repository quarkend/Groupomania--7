
import Share from '../share/Share'
import Post from '../post/Post'
import "./feed.css"
import { Posts } from '../../dummyData'
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { AuthContext } from './../../helpers/AuthContext';
import { useParams, Link, useHistory } from "react-router-dom";

export default function Feed({ username }) {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);
    let { id } = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
            setPostObject(response.data);
        });

        axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
            setComments(response.data);
        });
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = username
            await axios.get("/profile/")

            setPosts(
                res.data.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
            );
        };
        fetchPosts();
    }, [username]);

    return (
        <div className="feed">
            <div className="feedWrapper">
                {(!username || username === user.username) && <Share />}
                {posts.map((p) => (
                    <Post key={p._id} post={p} />
                ))}
            </div>
        </div>
    );
}
