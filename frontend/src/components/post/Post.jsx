import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from './../../App';
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
import "./post.css";
import { useForm } from 'react-hook-form'
import UpdateProfilePhoto from './../../pages/profile/UpdateProfilePhoto';

import {
    Chat,
    Cancel
} from "@material-ui/icons";
import MenuDots from '../MenuDots';
import Comment from './../comment/Comment';
const USER_INFO_URL = "http://localhost:8800/api/users/"
const url = "http://localhost:8800/images/"
export default function Post({ post }) {
    const { handleSubmit, register } = useForm()
    const [data, setData] = useState('')
    const [showUpdatePhoto, setShowUpdatePhoto] = useState(false)
    const [showComment, setShowComment] = useState(false)
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [users, setUsers] = useState([]);
    const {user }= useContext(AuthContext);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const storage = JSON.parse(localStorage.getItem('user'));
    const history = useHistory();
    console.log(user)
    const postId = post.id;
    const token = "Bearer " + JSON.parse(localStorage.getItem('token'));
    const [like, setLike] = useState([])
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users`,
                {
                    headers:
                        { "Authorization": token }
                }
            );
            setUsers(res.data);
            localStorage.setItem('userAount', JSON.stringify(res.data));
            console.log(res.data)
        };
        fetchUser();
    }, [token]);
    const likeHandler = () => {
        axios.post(`/likes`,
            {
                postId: post.id,
                userId: storage.id,
                like: 1
            },
            {
                headers:
                    { "Authorization": token }
            }).then((response) => {
                setLike(response.data.like);
                localStorage.setItem('like', JSON.stringify(response.data));
                console.log(like)
            });
    }
    // useEffect(() => {
    //     axios.get(`/posts/${post.id}/likes`, {
    //         headers:
    //             { "Authorization": token },
    //     }).then((response) => {
    //         setLike(response.data.length);
    //         console.log(response.data.like);
    //     });
    // }, [post.id, token]);
    useEffect(() => {
        axios.get(`/posts/byId/${post.id}`, {
            headers:
                { "Authorization": token },
        }).then((response) => {
            localStorage.setItem('post', JSON.stringify(response.data));
        });
    }, [post.id, token]);
    console.log(post)
    useEffect(() => {
        axios.get(`/posts/${post.id}/comments`, {
            headers:
                { "Authorization": token },
        }).then((response) => {
            setComments(response.data);
            console.log(response.data)
            localStorage.setItem('comments', JSON.stringify(response.data));
        });
    }, [post.id, token]);
    const deletePost = (id) => {
        axios
            .delete(`http://localhost:8800/api/posts/${id}`,
                {
                    headers:
                        { "Authorization": token }
                })
            .then(() => {
                window.location.reload();
                history.push("/");
            });
    };
    async function handleUpdateProfilePhoto(data) {
        const formData = new FormData()
        formData.append('image', data.image[0])
        console.log(data.image[0]);
        const sendPhoto = await fetch("http://localhost:8800/api/posts/upimg/" + post.id, {
            method: 'PUT',
            headers: {
                Authorization: "Bearer " + token
            },
            body: formData,
        })
        const response = await sendPhoto.json()
        console.log(response)
        getUserData()
        setShowUpdatePhoto(true)
        if (sendPhoto.ok) {
            console.log(response)
            setTimeout(() => {
                history.push(window.location.reload());
            }, 300);
        }
    }
    async function getUserData() {
        const URL = `${USER_INFO_URL}${storage.id}`
        const data = await fetch(URL, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        const response = await data.json()
        setData(response)
        setIsLoaded(true);
        setError(error);
        console.log(response)
    }
    useEffect(() => {
        getUserData()
    }, [])
    let userAuth;
    if (post.userId === storage.id) {
        userAuth = <div className="post-button">
            <i className="fas fa-portrait white fa-2x" onClick={() => {
                setShowUpdatePhoto(!showUpdatePhoto)
            }}>
            </i>
            {showUpdatePhoto &&
                <UpdateProfilePhoto submit={handleSubmit(handleUpdateProfilePhoto)} register={register({ required: true })} />
            }
            <div className="postBottom">
                <div className="postBottomLeft" >
                </div>
            </div>
        </div>
    } else if (!!storage.isAdmin === true) {
        userAuth = <div className="post-button">
            <button className="btn btn-outline-danger btn-sm" onClick={() => { history.push("/postdelete/" + postId) }}>Supprimer2admin </button>
        </div>
    }
    return (
        <div className="card">
            <div className="post">
                <div className="postWrapper">
                    <div className="postTop">
                        <div className="postTopLeft">
                            <span className="postUsername">
                                {/* {users.filter((u) => u.id === post?.userId)[0].username} */}
                            </span>
                            {users.map((user) => {
                                if (post.userId === user.id) {
                                    return (
                                        <div key={user.id + post.id}>
                                            {/* <h2 key={"h2" + user.id}>Publié par <Link to={"/users/" + user.id} key={user.id + post.id} className="nav-link">{user.username} vvv</Link></h2> */}
                                           <img className="postProfileImg" src={
                                              user.profilePicture
                                                    ? url + user.profilePicture
                                                    : url + "noAvatar.png"
                                            }/>{user.username}</div>
                                    )
                                } else {
                                    return null
                                }
                            })}
                        </div>
                        <div className="postTopRight">
                            <span className="postDate">{format(post.createdAt)}</span>
                            <p className="postDate"> Posté le {post.createdAt.split('T').join(' à ').split('.000Z').join('')}</p>
                        </div>
                        <MenuDots />
                    </div>
                    <div className="detail">
                        <h1>{post.title} </h1>
                        <div className="">
                            <p>Title:{post.title} </p>
                            {post.img
                                ? <img className="postImg"
                                    src={"http://localhost:8800/images/" + post.img}
                                    alt="center"
                                /> : null}
                        </div>
                        {userAuth}
                        <hr />
                        <h3>Title:{post.title}</h3>
                        <h4>Description:{post.desc}{data.like}</h4>
                        <hr />
                    </div>
                    <div className="postBottomLeft">
                        <img className="likeIcon" src="/assets/like.png" onClick={likeHandler} alt="" />
                        <img className="likeIcon" src="/assets/heart.png" onClick={likeHandler} alt="" />
                        <span className="postLikeCounter"> {like} people like it</span>
                    </div>
                    <div className="postBottom">
                        <div className="postBottomLeft" >
                        </div>
                        <div className="postBottomRight">
                            <span className="postCommentText">Supprimer le post</span>
                            <Cancel className="shareIcon" onClick={() => {
                                deletePost(post.id);
                            }} />
                        </div>
                    </div>
                    {showComment.shown ? <Comment />
                        : ""}
                    <div className="topbarIcon">
                        <div className="topbarIconItem">
                            <Chat onClick={() => setShowComment({ shown: !showComment.shown })} />
                            <span className="topbarIconBadge">{comments.length}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
