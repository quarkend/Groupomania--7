import { MoreVert } from '@material-ui/icons';
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./post.css";



export default function Post({ post }) {

    let { id } = useParams();
    const [postObject, setPostObject] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [user, setUser] = useState({});
    // const { user: currentUser } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const storage = JSON.parse(localStorage.getItem('access'));


    const userId = storage.userId;
    let token = "Bearer " + storage.token;
    const [like, setLike] = useState([])
    const [isLiked, setIsLiked] = useState(false)
    // const likeHandler = () => {
    //     setLike(isLiked ? like - 1 : like + 1)
    //     setIsLiked(!isLiked)
    // }
    const likeHandler = () => {



        axios.post(`/likes`,
            {

                postId: post.id,
                userId: userId,
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

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users/${userId}`,

                {
                    headers:
                        { "Authorization": token }
                });
            setUser(res.data);
            console.log(res.data)
        };

        fetchUser();
    }, [userId, token]);
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
                    userId: storage.userId
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

    // const deletePost = (id) => {
    //     axios
    //         .delete(`http://localhost:8800/api/posts/${id}`, {
    //             headers: { accessToken: localStorage.getItem("accessToken") },
    //         })
    //         .then(() => {
    //             history.push("/");
    //         });

    // };
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postProfileImg">
                        <img
                            src={"http://localhost:8800/images/" + user.profilePicture}
                            alt="user"

                        />

                        <Link to={`/profile/${user.username}`}>  profile </Link>
                        {/* <img className="postProfileImg" src={post.profilePicture} alt="" /> */}

                        {/* <span className="postDate">{post.date}</span> */}
                    </div>
                    <div className="postTopRight">
                    </div>
                    <MoreVert />
                </div>
                <div className="postCenter">
                    <span className="postText">{comments.content}</span>
                    <span className="postText">{post.desc}</span>
                    <div className="images">

                        <img
                            src={"http://localhost:8800/images/" + post.img}
                            alt="user"

                        />



                    </div>

                </div>

                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src="assets/like.png" onClick={likeHandler} alt="" />
                        <img className="likeIcon" src="assets/heart.png" onClick={likeHandler} alt="" />
                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText"> {postObject.desc} </span>
                    </div>
                </div>

            </div>
            <input
                type="text"
                placeholder="Comment..."
                autoComplete="off"
                value={newComment}
                onChange={(event) => {
                    setNewComment(event.target.value);
                }}
            />
            <button onClick={addComment}> Add Comment</button>

            <div className="listOfComments">
                {comments.map((comment, key) => {
                    return (
                        <div key={key} className="comment">
                            {comment.content}
                            <label> Username: {user.username}</label>
                            {(
                                <button
                                    onClick={() => {
                                        deleteComment(comment.id);
                                    }}
                                >
                                    X
                                </button>

                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

