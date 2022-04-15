import React from 'react'
import "./share.css";
import {
    PermMedia,
    Cancel,
} from "@material-ui/icons";
import { useRef, useState } from "react";
import axios from "axios";
const url = "http://localhost:8800/images/"
export default function Share() {

    const storage = JSON.parse(localStorage.getItem('user'))
    const desc = useRef();
    const title = useRef();
    const [file, setFile] = useState(null);
    const submitHandler = async (e) => {
        e.preventDefault();
        const storage = JSON.parse(localStorage.getItem('user'));
        let token = "Bearer " + storage.token;
        const newPost = {
            userId: storage.id,
            desc: desc.current.value,
            title: title.current.value,
        };
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
            console.log(newPost);
            try {
                await axios.post("http://localhost:8800/upload", data);
            } catch (err) { }
        }
        try {
            await axios.post("/posts", newPost,
                {
                    headers:
                        { "Authorization": token }
                }
            );
            window.location.reload();
        } catch (err) { }
    };

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img
                        className="shareProfileImg"
                        src={
                            storage.profilePicture
                                ? url + storage.profilePicture
                                : "/assets/person/noAvatar.png"
                        }
                        alt="profilePicture" />

                    <input

                        placeholder={storage.username + ": Create Post : Title ?"}
                        className="shareInput"
                        ref={title}
                    />
                    <input
                        placeholder={"Description ?"}
                        className="shareInput"
                        ref={desc}
                    />
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                        <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText">Multimedia</span>
                            <input
                                style={{ display: "none" }}
                                type="file"
                                id="file"
                                accept=".png,.jpeg,.jpg"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                    </div>
                    <button className="shareButton" type="submit">
                        Share
                    </button>
                </form>
            </div>
        </div>
    );
}
