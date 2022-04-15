import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from './../../App';
import axios from "axios";
import {
    Chat,
    Cancel,
} from "@material-ui/icons";

export default function Comment({ Post }) {
    const [post, setPost] = useState([])
    const [showComment, setShowComment] = useState(false)
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const user = useContext(AuthContext);

    const storage = JSON.parse(localStorage.getItem('user'));
    const stor = JSON.parse(localStorage.getItem('post'));
    console.log(user.state.user)
    let token = "Bearer " + storage.token;
    useEffect(() => {
        axios.get(`/posts/byId/${stor.id}`, {
            headers:
                { "Authorization": token },
        }).then((response) => {
            setPost(response.data)
            localStorage.setItem('post', JSON.stringify(response.data));
        });
    }, [token]);
    console.log(post)
    useEffect(() => {
        axios.get(`/posts/${stor.id}/comments`, {
            headers:
                { "Authorization": token },
        }).then((response) => {
            setComments(response.data);
            console.log(response.data)
            localStorage.setItem('comments', JSON.stringify(response.data));
        });
    }, [stor.id, token]);
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
                    window.location.reload();
                }
            });
    };
    const deleteComment = (id) => {
        axios
            .delete(`/comments/${id}`, {
                headers:
                    { "Authorization": token }
            })
            .then(() => {
                window.location.reload();
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

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="card-reaction">
                </div>
                <div className="card-comment">
                    <form >
                        <input id="comm" type="text" name="comment" placeholder="Laisser un commentaire "
                            autoComplete="off"
                            value={newComment}
                            onChange={(event) => {
                                setNewComment(event.target.value);
                            }}
                        />
                    </form>
                    <div className="card-reaction">
                        <button id="comm" onClick={addComment}> Add Comment</button>
                    </div>
                </div>

            </div>
            <div className="listOfComments">
                <h5>Nombre :{comments.length}</h5>
                <ul className="comments">
                    {comments.map((comment, key) => {

                        return (
                            <li key={post.id + comment.id} className="comment">
                                {comment.content}:{comment.postId}
                                {(showComment && stor.id === <div className="listOfComments"></div>) &&
                                    <div className="update__container" key={comment.id}>
                                    </div>
                                }
                                {(
                                    <Cancel className="shareIcon" onClick={() => {
                                        deleteComment(comment.id);
                                    }} />
                                )}
                                <Chat title="Modification" onClick={handleShowComment} data-id={comment.id}>Comments</Chat>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
