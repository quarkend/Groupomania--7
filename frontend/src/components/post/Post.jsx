import { MoreVert } from '@material-ui/icons';
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from './../../App';
import { useParams, Link, useHistory } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
import "./post.css";
import {

    PermMedia,
    Label,
    Room,
    EmojiEmotions,
    Cancel,
} from "@material-ui/icons";


export default function Post({ post }) {

    // let { id } = useParams();
    const [postObject, setPostObject] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    // const [user, setUser] = useState({});
    // const user  = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const storage = JSON.parse(localStorage.getItem('user'));
    const user = JSON.parse(localStorage.getItem('user'));
    const history = useHistory();

    console.log(user)
    const userId = storage.id;
    let token = "Bearer " + storage.token;
    const [like, setLike] = useState([])
    const [isLiked, setIsLiked] = useState(false)

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
            console.log(response.data.length)
        });
    }, [post.id, token]);

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         const res = await axios.get(`/users/${userId}`,

    //             {
    //                 headers:
    //                     { "Authorization": token }
    //             });
    //         setUser(res.data);
    //         console.log(res.data)
    //     };

    //     fetchUser();
    // }, [userId, token]);
    console.log(post)


    useEffect(() => {


        axios.get(`/posts/${post.id}/comments`, {
            headers:
                { "Authorization": token },
        }).then((response) => {
            setComments(response.data);
            console.log(response.data)
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
            .delete(`/comments/${id}`, {
                headers: { accessToken: localStorage.getItem("accessToken") },
            })
            .then(() => {
                setComments(
                    comments.filter((val) => {
                        return val.id !== id;
                    })
                );
            });
    };

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
    return (
        <div className="card">

            <div className="post">
                <div className="postWrapper">
                    <div className="postTop">
                        <div className="postTopLeft">

                            <img className="postProfileImg"
                                src={"http://localhost:8800/images/" + user.profilePicture}
                                alt="user"

                            />

                            <Link to={`/profile/${user.username}`}>  profile </Link>
                            {/* <img className="postProfileImg" src={post.profilePicture} alt="" /> */}



                        </div>
                        <div className="postTopRight">
                            <span className="postDate">{format(post.createdAt)}</span>
                        </div>
                        <MoreVert />
                    </div>
                    <p className="created-at"> Posté le {post.createdAt.split('T').join(' à ').split('.000Z').join('')}</p>
                    <div className="detail">
                        <hr />
                        <h3>{post.title}</h3>
                        <h3>{user.username}</h3>
                        <hr />
                        <br />
                        <h4>{post.desc}</h4>
                        <hr />
                    </div>

                    <div className="card-image__post">
                        <img className="postImg"
                            src={"http://localhost:8800/images/" + post.img}
                            alt="center"

                        />
                    </div>

                    <div className="card-reaction">
                    <img className="likeIcon" src="assets/like.png" onClick={likeHandler} alt="" />
                    <img className="likeIcon" src="assets/heart.png" onClick={likeHandler} alt="" />
                    <span className="postLikeCounter">{like} people like it</span>
                    </div>

                    <div className="card-comment">



                        <form >
                            <input className="card-input" id="hcom" type="text" name="comment" placeholder="Laisser un commentaire "

                                autoComplete="off"
                                value={newComment}
                                onChange={(event) => {
                                    setNewComment(event.target.value);
                                }}
                            />
                        </form>

                        <div className="card-reaction">
                            <button id="hcom" onClick={addComment}> Add Comment</button>
                        </div>
                    </div>


                    <div className="images">

                        {/* <img  className="postImg"
                            src={"http://localhost:8800/images/" + post.img}
                            alt="center"

                        /> */}



                    </div>




                    <div className="postBottom">
                        <div className="postBottomLeft">

                        </div>
                        <div className="postBottomRight">
                            <span className="postCommentText"> {post.desc} </span>
                            <Cancel className="shareIcon" onClick={() => {
                                deletePost(post.id);
                            }} />
                        </div>

                    </div>

                </div>
                  <div className="listOfComments">
                <div className="comments">
           
                        {comments.map((comment, key) => {
                            return (
                                <div key={key} className="comment">
                                    {comment.content}
                                    {/* <label> Username: {currentUser.username}</label> */}
                                    {(



                                        <Cancel className="shareIcon" onClick={() => {
                                            deleteComment(comment.id);
                                        }} />


                                    )}
                                </div>
                            );
                        })}
                    </div>


                </div>
            
                <div className="postBottomLeft">
                    <img className="likeIcon" src="assets/like.png" onClick={likeHandler} alt="" />
                    <img className="likeIcon" src="assets/heart.png" onClick={likeHandler} alt="" />
                    <span className="postLikeCounter">{like}</span>
                </div>
            </div>

        </div>
    );
}

