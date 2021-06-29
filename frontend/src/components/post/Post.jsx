import { MoreVert } from '@material-ui/icons'
import React from 'react'
import "./post.css"

export default function Post({ post }) {
    console.log(post);
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img className="postProfileImg" src="/assets/person/1.jpg" alt="" />
                        <span className="postUsername">Rayen</span>
                        <span className="postDate">2 seconds ago</span>
                    </div>
                    <div className="postTopRight">
                    </div>
                    <MoreVert />
                </div>
                <div className="postCenter">
                    <span className="postText">hey its my first post:)!</span>
                    <img className="postImg" src="/assets/post/3.jpg" alt="" />


                </div>

                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src="/assets/post/HEART.jpg" alt="" />
                        <img className="likeIcon" src="/assets/post/LIKE.png" alt="" />
                        <span className="postLikeCounter">165 like it

                        </span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">56 comments</span>

                    </div>
                </div>

            </div>
        </div>
    )
}
