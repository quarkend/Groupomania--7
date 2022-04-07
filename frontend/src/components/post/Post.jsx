import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from './../../App';
import { useParams, Link, useHistory } from "react-router-dom";
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
const USER_INFO_URL = "http://localhost:8800/api/users/"
export default function Post({ post }) {
    const { handleSubmit, register } = useForm()
    const [data, setData] = useState('')
    const [showUpdatePhoto, setShowUpdatePhoto] = useState(false)
    const [showComment, setShowComment] = useState(false)
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [users, setUsers] = useState([]);
    const user = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const storage = JSON.parse(localStorage.getItem('user'));
    const history = useHistory();
    console.log(user.state.user)
    const userId = storage.id;
    const token = "Bearer " + JSON.parse(localStorage.getItem('token'));
    let { id } = useParams();
    const [like, setLike] = useState([])
    const [isLiked, setIsLiked] = useState(false)
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
                console.log(response.data.like)
                localStorage.setItem('like', JSON.stringify(response.data));
                console.log(response.data.like)
            });
    }
    useEffect(() => {
        axios.get(`/posts/${post.id}/likes`, {
            headers:
                { "Authorization": token },
        }).then((response) => {
            setLike(response.data.length);
        });
    }, [post.id, token]);
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
    const addComment = () => {
        axios
            .post(
                "/comments",
                {
                    content: newComment,
                    postId: post.id,
                    userId: storage.id
                },
                {
                    headers:
                        { "Authorization": token }
                }
            )
            .then((response) => {
                if (response.data.error) {
                    console.log(response.data.error);
                } else {
                    const commentToAdd = {
                        content: newComment,
                        username: response.data.username,
                    };
                    setComments([...comments, commentToAdd]);
                    setNewComment("");
                }
            });
    };
    const deleteComment = (id) => {
        axios
            .delete(`/comments/${id}`,
                {
                    headers:
                        { "Authorization": token }
                })
            .then(() => {
                setComments(
                    comments.filter((val) => {
                        return val.id !== id;
                    })
                );
            });
    };
    function handleShowComment(e) {
        setShowComment(!showComment)
    }
    const deletePost = (id) => {
        axios
            .delete(`http://localhost:8800/api/posts/${id}`,
                {
                    headers:
                        { "Authorization": token }
                })
            .then(() => {
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
        console.log(response)
    }
    useEffect(() => {
        getUserData()
    }, [])
    return (
        <div className="card">
            <div className="post">
                <div className="postWrapper">
                    <div className="postTop">
                        <div className="postTopLeft">
                            <span className="postUsername">
                                {/* {users.filter((u) => u.id === post?.userId)[0].username} */}
                            </span>
                            <img className="postProfileImg"
                                src={"http://localhost:8800/images/" + data.profilePicture}
                                alt="user"
                            />
                            <Link to={`/profile/${data.username}`}> {data.username}</Link>
                        </div>
                        <div className="postTopRight">
                            <span className="postDate">{format(post.createdAt)}</span>
                        </div>
                        <MenuDots />
                    </div>
                    <p className="created-at"> Posté le {post.createdAt.split('T').join(' à ').split('.000Z').join('')}</p>
                    <div className="detail">
                        <hr />
                        <h3>{post.title}</h3>
                        <h4>{post.desc}</h4>
                        <hr />
                    </div>
                    <div className="card-image__post">
                        <img className="postImg"
                            src={"http://localhost:8800/images/" + post.img}
                            alt="center"
                        />
                        <i className="fas fa-portrait white fa-3x" onClick={() => {
                            setShowUpdatePhoto(!showUpdatePhoto)
                        }}>
                        </i>
                    </div>
                    {showUpdatePhoto &&
                        <UpdateProfilePhoto submit={handleSubmit(handleUpdateProfilePhoto)} register={register({ required: true })} />
                    }
                    <div className="card-reaction">
                        <img className="likeIcon" src="/assets/like.png" onClick={likeHandler} alt="" />
                        <img className="likeIcon" src="/assets/heart.png" onClick={likeHandler} alt="" />
                        <span className="postLikeCounter">{like} people like it</span>
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
                </div>
                {/* <div className="postBottomLeft">
                    <img className="likeIcon" src="/assets/like.png" onClick={likeHandler} alt="" />
                    <img className="likeIcon" src="/assets/heart.png" onClick={likeHandler} alt="" />
                    <span className="postLikeCounter">{like}</span>
                </div> */}
                {showComment.shown ? <div className="listOfComments">
                <div className="card-comment">
                        <form >
                            <input className="" id="hcom" type="text" name="comment" placeholder="Laisser un commentaire "
                                autoComplete="off"
                                value={newComment}
                                onChange={(event) => {
                                    setNewComment(event.target.value);
                                }}
                            />
                            {/* <input type="text" placeholder="Mettre a jour "        onChange={(event) => {
                                  setUpdateComment(event.target.value);
                                }}value={updateComment}/> */}
                        </form>
                        <div className="card-reaction"  >
                            <button id="hcom" onClick={addComment}> Add Comment</button>
                            {/* <button id="hcom" onClick={handleUpdateComment}> update Comment</button> */}
                        </div>
                    </div>
                    <ul className="comments">
                        {comments.map((comment, key) => {
                            return (
                                <li key={key} className="comment">
                                    {comment.content}
                                    {(showComment && storage.id === <div className="listOfComments"></div>) &&
                                        <div className="update__container" key={comment.id}>
                                        </div>
                                    }
                                    {(
                                        <Cancel className="shareIcon" onClick={() => {
                                            deleteComment(comment.id);
                                        }} />
                                    )}
                                    <Chat title="Modification" onClick={handleShowComment} data-id={comment.id}></Chat>
                                </li>
                            );
                        })}
                    </ul>
                </div> : ""}
                <div className="topbarIcon">
                    <div className="topbarIconItem">
                        <Chat onClick={() => setShowComment({ shown: !showComment.shown })} />
                        <span className="topbarIconBadge">{comments.length}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
