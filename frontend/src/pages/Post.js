import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { MoreVert } from "@material-ui/icons";
function Post(post) {
    let { id } = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [Users, setUsers] = useState([]);
    const { authState } = useContext(AuthContext);
    const storage = JSON.parse(localStorage.getItem('access'));
    const userId = storage.userId;


    const postId = post.id;
    let token = "Bearer " + storage.token;
    let history = useHistory();
    useEffect(() => {
        // axios.get(`http://localhost:3001/auth/basicInfo/${id}`).then((response) => {

        //   setUsers(response.data.username);
        //   localStorage.setItem(' setUsers', JSON.stringify(response.data.username));
        // });
        axios.get(`/users/${postId}`).then((response) => {

            setUsers(response.data);
            localStorage.setItem(' setUsers', JSON.stringify(response.data));
        });

        axios.get(`/posts/byuserId/${postId}`).then((response) => {
            setPostObject(response.data);
            localStorage.setItem(' setPostObject', JSON.stringify(response.data));
        });
    }, []);
    /****************************** */
    useEffect(() => {
        axios.get(`http://localhost:8800/api/posts/byId/${postId}`,

            {
                headers:
                    { "Authorization": token }
            }).then((response) => {
                setPostObject(response.data);
                localStorage.setItem('setPostObject', JSON.stringify(response.data));
            });

        axios.get(`/comments/${id}`).then((response) => {
            setComments(response.data);
            localStorage.setItem(' setComments', JSON.stringify(response.data));
        });
    }, []);
    // const [like, setLike] = useState(postObject.like)
    const [isLiked, setIsLiked] = useState(false)

    // const likeHandler = () => {
    //     setLike(isLiked ? like - 1 : like + 1)
    //     setIsLiked(!isLiked)
    // }
    const addComment = () => {
        axios
            .post(
                "/comments",
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
            .delete(`/posts/${id}`, {
                headers: { accessToken: localStorage.getItem("accessToken") },
            })
            .then(() => {
                history.push("/");
            });
    };
    return (
        <div className="postPage">
            <div className="post">
                <div className="postWrapper">
                    <div className="postTop">
                        <div className="postTopLeft">
                            {/* <img
                                className="postProfileImg"
                                src={Users.filter((u) => u.id === postObject?.userId)[0].profilePicture}
                                alt=""
                            /> */}
                            {/* <span className="postUsername">
                                {Users.filter((u) => u.id === postObject?.userId)[0].username}
                            </span> */}
                            {/* <span className="postDate">{postObject.date}</span> */}
                        </div>
                        <div className="postTopRight">
                            <MoreVert />
                        </div>
                    </div>
                    <div className="postCenter">
                        <span className="postText">{postObject?.postText}</span>
                        {/* <img className="postImg" src={postObject.img} alt="" /> */}
                    </div>
                    <div className="postBottom">
                        {/* <div className="postBottomLeft">
                            <img className="likeIcon" src="assets/like.png" onClick={likeHandler} alt="" />
                            <img className="likeIcon" src="assets/heart.png" onClick={likeHandler} alt="" />
                            <span className="postLikeCounter">{like} people like it</span>
                        </div> */}
                        <div className="postBottomRight">
                            <span className="postCommentText"> postObject.desc </span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Post;
//  <div className="leftSide">
//         <div className="post" id="individual">
//           <div className="title"> {postObject.title} </div>
//           <div className="body">{postObject.postText}</div>
//           <div className="footer">
//             {postObject.username}
//             {authState.username === postObject.username && (
//               <button
//                 onClick={() => {
//                   deletePost(postObject.id);
//                 }}
//               >
//                 {" "}
//                 Delete Post
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className="rightSide">
//         <div className="addCommentContainer">
//           <input
//             type="text"
//             placeholder="Comment..."
//             autoComplete="off"
//             value={newComment}
//             onChange={(event) => {
//               setNewComment(event.target.value);
//             }}
//           />
//           <button onClick={addComment}> Add Comment</button>
//         </div>
//         <div className="listOfComments">
//           {comments.map((comment, key) => {
//             return (
//               <div key={key} className="comment">
//                 {comment.commentBody}
//                 <label> Username: {comment.username}</label>
//                 {authState.username === comment.username && (
//                   <button
//                     onClick={() => {
//                       deleteComment(comment.id);
//                     }}
//                   >
//                     X
//                   </button>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>