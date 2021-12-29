import React from "react";

export const Card = ({ post }) => {
    
  return (
    <div className="card">
      {/* <img
        src={song.albumArt}
        alt=""
      /> */}
      <div className="content">
        <h2>post.id</h2>
        <span>BY: post.id</span>
      </div>
    </div>
  );
};

export default Card;
