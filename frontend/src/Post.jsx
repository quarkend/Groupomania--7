import React from "react";
export const Post = ({ post }) => {
    console.log(post)
    return (
        <div className="post">
            {/* <img
                src={post.img}
                alt=""
            /> */}
            <div className="content">
                <h2>post.id</h2>
                <span>BY: post.id</span>
            </div>
        </div>
    );
};
export default Post;