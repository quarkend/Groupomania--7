import { MoreVert } from '@material-ui/icons';
import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from './../../helpers/AuthContext';
import "./post.css";



export default function Post({ post }) {
    let { id } = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);
    // const userId = 1;

    // const [isLiked, setIsLiked] = useState(false)
    // const likeHandler = () => {
    //     // setLike(isLiked ? like - 1 : like + 1)
    //     setIsLiked(!isLiked)
    // }
    /** */
    // let history = useHistory();
    // useEffect(() => {
    //     const fetchUser = async () => {
    //         const res = await axios.get(`/users?userId=${post.userId}`);
    //         setUser(res.data);
    //     };
    //     fetchUser();
    // }, [post.userId]);
    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
            setPostObject(response.data);
        });

        axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
            setComments(response.data);
        });
    }, []);

    const addComment = () => {
        axios
            .post(
                "http://localhost:3001/comments",
                {
                    commentBody: newComment,
                    PostId: id,
                },
                {
                    headers: {
                        accessToken: localStorage.getItem("accessToken"),
                    },
                }
            )
            .then((response) => {
                if (response.data.error) {
                    console.log(response.data.error);
                } else {
                    const commentToAdd = {
                        commentBody: newComment,
                        username: response.data.username,
                    };
                    setComments([...comments, commentToAdd]);
                    setNewComment("");
                }
            });
    };

    const deleteComment = (id) => {
        axios
            .delete(`http://localhost:3001/comments/${id}`, {
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
    //         .delete(`http://localhost:3001/posts/${id}`, {
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
                    <div className="postTopLeft">
                        <Link to={`/profile/${user.username}`}>   </Link>
                        {/* <img className="postProfileImg" src={User.filter((u) => u.id === post.userId)[0].profilePicture} alt="" /> */}
                        {/* <span className="postUsername">{User.filter((u) => u.id === post.userId)[0].username}</span> */}
                        <span className="postDate">post.date</span>
                    </div>
                    <div className="postTopRight">
                    </div>
                    <MoreVert />
                </div>
                <div className="postCenter">
                    <span className="postText">post.desc</span>
                    <img className="postImg" alt="" />


                </div>

                <div className="postBottom">
                    <div className="postBottomLeft">
                        {/* <img className="likeIcon" src="/assets/heart.png" onClick={likeHandler} alt="" />
                        <img className="likeIcon" src="/assets/like.png" onClick={likeHandler} alt="" /> */}
                        <span className="postLikeCounter">like

                        </span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">post.comment CDDD</span>

                    </div>
                </div>

            </div>
        </div>
    );
}

// {/* <div className="postPage">
//     <div className="leftSide">

//         <div className="post" >

//             <div className="body">{postObject.postText}</div>
//             {/* <span className="postUsername">{User.filter((u) => u.id === User.id)[1]}</span> */}
//         </div>
//     </div>
//     <div className="rightSide">
//         <div className="addCommentContainer">
//             <input
//                 type="text"
//                 placeholder="Comment..."
//                 autoComplete="off"
//                 value={newComment}
//                 onChange={(event) => {
//                     setNewComment(event.target.value);
//                 }}
//             />
//             <button onClick={addComment}> Add SCSSCSCCSSComment</button>
//         </div>
//         <div className="listOfComments">
//             {comments.map((comment, key) => {
//                 return (
//                     <div key={key} className="comment">
//                         {comment.commentBody}
//                         <label> Username: {comment.username}</label>
//                         {authState.username === comment.username && (
//                             <button
//                                 onClick={() => {
//                                     deleteComment(comment.id);
//                                 }}
//                             >
//                                 X
//                             </button>
//                         )}
//                     </div>
//                 );
//             })}
//         </div>
//     </div>
// </div>
//     ); */}