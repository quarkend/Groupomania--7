import React from 'react'
import "./share.css"
import { PermMedia } from "@material-ui/icons"


export default function Share() {
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src="/assets/person/21.jpg" alt="" />
                    <input placeholder="whats in your mind?" className="shareInput" />
                </div>
                <hr className="shareHr" />
                <div className="shareBottom">
                    <div class="shareOptions">
                        <div class="shareOption">
                            <PermMedia className="shareIcon" />
                            <span className="shareOptionText">Photo or Video</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}