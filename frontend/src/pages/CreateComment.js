import React, { useEffect, useState, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import Topbar from "../components/topbar/Topbar"
import Sidebar from "../components/sidebar/Sidebar"
import Feed from "../components/feed/Feed"
import Rightbar from "../components/rightbar/Rightbar"
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
function CreateComment() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  const { authState } = useContext(AuthContext);
  let history = useHistory();

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

  const addComment = () => {
    axios
      .post(
        "http://localhost:8800/api/comments",
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
          comments.push(comments);
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:8800/api/comments/${id}`, {
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
      .delete(`http://localhost:8800/api/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        history.push("/");
      });
  };
  return (
    <div className="postPage">
      <div className="leftSide">

        <div className="homeContainer">




          <div className="post" id="individual">




          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment..."
            autoComplete="off"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button onClick={addComment}> AdComment</button>
        </div>
        <div className="listOfComments">

          {comments.map((comment, key) => {
            return (

              <div key={key} className="comment">
                {comment.commentBody}
                <label> Usname: {comment.username}</label>

                {authState.username === comment.username && (
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
    </div>

  );
}

export default CreateComment;
