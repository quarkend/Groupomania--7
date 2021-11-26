
import Share from '../share/Share'
import Post from '../post/Post'
import "./feed.css"
import { Posts } from '../../DATA'
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
        axios.get(`http://localhost:8800/api/posts/byId/${id}`).then((response) => {
            setPostObject(response.data);
        });

        axios.get(`http://localhost:8800/api/comments/${id}`).then((response) => {
            setComments(response.data);
        });
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = username
            await axios.get("http://localhost:8800/api/profile/")

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
                {Posts.map((p) => (
                    <Post key={p._id} post={p} />
                ))}
            </div>
        </div>
    );
}
