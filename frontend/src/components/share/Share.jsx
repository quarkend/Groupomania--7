import React from 'react'
import "./share.css";
import {
    PermMedia,
    Label,
    Room,
    EmojiEmotions,
    Cancel,
} from "@material-ui/icons";
import Picker from 'emoji-picker-react';
import { useEffect, useContext, useRef, useState } from "react";
// import { AuthContext } from './../../helpers/AuthContext';
// import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useParams, Link, useHistory } from "react-router-dom";
import { AuthContext } from './../../App';
export default function Share() {
    // let { id } = useParams();
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    
    const desc = useRef();
    /////
    const [state, setState] = useState({ shown: false });
    const [chosenEmoji, setChosenEmoji] = useState(null);

    const onEmojiClick = (event, emojiObject) => {
      setChosenEmoji(emojiObject);
    };
    const [file, setFile] = useState(null);
    const submitHandler = async (e) => {
        e.preventDefault();
        const storage = JSON.parse(localStorage.getItem('user'));
        let token = "Bearer " + storage.token;
        // const user = JSON.parse(localStorage.getItem(' userAccount'));
        const newPost = {
            userId: storage.id,
            desc: desc.current.value,
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
//   Picker.init({
//         selector: "#mytextarea",
//         plugins: "emoticons autoresize",
//         toolbar: "emoticons",
//         toolbar_location: "bottom",
//         menubar: false,
//         statusbar: false
//       });
      
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    {/* <img
                        className="shareProfileImg"
                        src={
                            user.profilePicture
                                ? url + user.profilePicture
                                : url + "person/noAvatar.png"
                        }
                        alt="profilePicture" /> */}
                    <input
                        placeholder={"Create Post : Title "}
                        className="shareInput"
                        ref={desc}
                    />
                    {/* <input
                        placeholder={"What's in your mind " + user.username + "?"}
                        className="shareInput"
                        ref={desc}
                    /> */}
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
                            <span className="shareOptionText">Photo or Video</span>
                            <input
                                style={{ display: "none" }}
                                type="file"
                                id="file"
                                accept=".png,.jpeg,.jpg"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                        {/* <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon" />
                            <span className="shareOptionText">Tag</span>
                        </div> */}
                        <label className="shareOption">
                            <Room htmlColor="green" className="shareIcon" />
                            <span className="shareOptionText">Location</span>
                        </label>
                        <label className="shareOption">
                            <EmojiEmotions   onEmojiClick={onEmojiClick}  onClick={() => setState({ shown: !state.shown })} htmlColor="goldenrod" className="shareIcon" />
                            {/* <span className="shareOptionText">Feelings</span> */}
                       
                           
      {chosenEmoji ? (
        <span  className="shareOptionText">Feelings: {chosenEmoji.emoji}</span>
      ) : (
        <span>No emoji Chosen</span>
      )}
       </label>    
      <h2 >{state.shown ?   <Picker onEmojiClick={onEmojiClick}  />  : '' }</h2>
      {/* <button onEmojiClick={onEmojiClick}  onClick={() => setState({ shown: !state.shown })}>Toggle</button> */}
    
  
 
                    </div>
                    <button className="shareButton" type="submit">
                        Share
                    </button>
                </form>
            </div>
        </div>
    );
}
