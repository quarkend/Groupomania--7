import { MoreVert } from '@material-ui/icons';
import React from 'react';
import "./post.css";
import { Users } from '../../dummyData';

export default function Post({ post }) {
    // const user = Users.filter(u => u.id === 1)
    // console.log(user[0].username)
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img className="postProfileImg" src={Users.filter((u) => u.id === post.userId)[0].profilePicture} alt="" />
                        <span className="postUsername">{Users.filter((u) => u.id === post.userId)[0].username}</span>
                        <span className="postDate">{post.date}</span>
                    </div>
                    <div className="postTopRight">
                    </div>
                    <MoreVert />
                </div>
                <div className="postCenter">
                    <span className="postText">{post.desc}</span>
                    <img className="postImg" src={post.photo} alt="" />


                </div>

                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src="/assets/post/HEART.jpg" alt="" />
                        <img className="likeIcon" src="/assets/post/LIKE.png" alt="" />
                        <span className="postLikeCounter">{post.like}

                        </span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment}</span>

                    </div>
                </div>

            </div>
        </div>
    )
}
