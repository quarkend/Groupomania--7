import React from 'react'
import Share from '../share/Share'
import Post from '../post/Post'
import "./feed.css"


export default function feed() {
    return (
        <div className="feed">
            <div class="feedWrapper">
                <Share />
                <Post />
            </div>
        </div>
    )
}
