// import React from 'react'
// import "./share.css";
// import {
//     PermMedia,
//     Label,
//     Room,
//     EmojiEmotions,
//     Cancel,
// } from "@material-ui/icons";
// import { useEffect, useContext, useRef, useState } from "react";
// // import { AuthContext } from './../../helpers/AuthContext';
// // import { AuthContext } from "../../context/AuthContext";
// import { AuthContext } from './../../helpers/AuthContext';
// import axios from "axios";

// import { useParams, Link, useHistory } from "react-router-dom";
// const storage = JSON.parse(localStorage.getItem('user'));
// export default function UpdateProfilePhoto() {
//     // let { id } = useParams();
//     const { user } = useContext(AuthContext);
//     const PF = process.env.REACT_APP_PUBLIC_FOLDER;
//     const desc = useRef();
//     const [file, setFile] = useState(null);
//     const [data, setData] = useState('')
//     const submitHandler = async (e) => {
//         e.preventDefault();
//         const storage = JSON.parse(localStorage.getItem('user'));

//         let token = "Bearer " + storage.token;

//         // const user = JSON.parse(localStorage.getItem(' userAccount'));



   
//         if (file) {
//             const data = new FormData();
//             const fileName = Date.now() + file.name;
//             data.append("name", fileName);
//             data.append("file", file.inputs.value);
//             data.img = fileName;
//             console.log(data);
//             try {
//                 await axios.post("http://localhost:8800/upload", data);
//             } catch (err) { }
//         }
//         try {
//             await axios.put("/posts/upimg/" + 11 , 
//                 {
//                     headers:
//                         { "Authorization": token }
//                 }
//             );
//             window.location.reload();
//         } catch (err) { }
//     };

//     return (
//         <div className="shagre">
//             <div className="sharegWrapper">
//                 <div className="shareTop">
//                     <img
//                  src={"http://localhost:8800/images/" + user.img}

//                         alt="dd"
//                     />  
//                     <img src="" alt="XX" className="shareProfileImg" />
//                     <input 
//                     />
//                      <input
//                         placeholder={"What's in your mind " + user.username + "?"}
//                         className="shareInput"
//                         ref={desc}
//                     /> 
//                 </div>
//                 <hr className="shareHr" />
//                 {file && (
//                     <div className="shareImgContaifner">
//                         <img className="shareImg" src={user.image} alt="" />
//                         <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
//                     </div>
//                 )}
//                 <form className="shareBottom" onSubmit={submitHandler}>
//                     <div className="shareOptions">
//                         <label htmlFor="file" className="shareOption">
//                             <PermMedia htmlColor="tomato" className="shareIcon" />
//                             <span className="shareOptionText">Photo or Video</span>
//                             <input
//                                 style={{ display: "none" }}
//                                 type="file"
//                                 id="file"
//                                 accept=".png,.jpeg,.jpg"
//                                 onChange={(e) => setFile(e.target.files[0])}
//                             />
//                         </label>
       
             
//                     </div>
//                     <button className="shareButton" type="submit">
//                     update
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }
// import React from 'react'
// import "./share.css";
// import {
//     PermMedia,
//     Label,
//     Room,
//     EmojiEmotions,
//     Cancel,
// } from "@material-ui/icons";
// import { useEffect, useContext, useRef, useState } from "react";
// // import { AuthContext } from './../../helpers/AuthContext';
// // import { AuthContext } from "../../context/AuthContext";
// import axios from "axios";
// import { useParams, Link, useHistory } from "react-router-dom";
// import { AuthContext } from './../../App';
// const post = JSON.parse(localStorage.getItem('post'));
// const storage = JSON.parse(localStorage.getItem('user'));
// let token = "Bearer " + storage.token;
// export default function UpdateProfilePhoto() {
//     let { id } = useParams();
//     const { user } = useContext(AuthContext);
//     const PF = process.env.REACT_APP_PUBLIC_FOLDER;
//     const url = "http://localhost:8800/images/";
//     const desc = useRef();
//     const [data, setData] = useState('')
//     const [file, setFile] = useState(null);
//     const storage = JSON.parse(localStorage.getItem('user'));
//     const submitHandler = async (e) => {
//         e.preventDefault();
    
//         // const user = JSON.parse(localStorage.getItem(' userAccount'));
//   ;        const newPost = {
//     userId: storage.id,
//     desc: desc.current.value,
// };
 
//         if (file) {
//             const data = new FormData();
//             const fileName = Date.now() + file.name;
//             data.append("name", fileName);
//             data.append("file", file);
//             newPost.img = fileName;
//             console.log(newPost);
       
//             try {
//                 await axios.post("http://localhost:8800/upload", data);
//             } catch (err) { }
     
//             console.log(fileName);
//         try {
//             await axios.put("http://localhost:8800/api/posts/upimg/" + post.id, data,
//                 {
//                     headers:
//                         { "Authorization": token }
//                 }
//             );
         

//         } catch (err) { }
//       };
//     }
//     async function getPostData() {
//         const URL = `${"http://localhost:8800/api/posts/byId/" }${post.id}`
//         const data = await fetch(URL, {
//                headers:    { "Authorization": token }
//          })
//          const response = await data.json()
//         setData(response)
//          console.log(response)
//    }
//    useEffect(() => {
//          getPostData()
//    }, [])
//       return (
//         <div className="share">
//             <div className="card">
//                 <img className="profileCoverImg" src={"http://localhost:8800/images/" + data.img} alt="" />
//                 <div className="shareTop">

//                     <input
//                         placeholder={"What'smind? "}
//                         className="shareInput"
//                         ref={desc}
//                     />
//                     {/* <input
//                         placeholder={"What's in your mind " + user.username + "?"}
//                         className="shareInput"
//                         ref={desc}
//                     /> */}
//                 </div>
//                 <hr className="shareHr" />
//                 {file && (
//                     <div className="shareImgContainer">
//                         <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
//                         <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
//                     </div>
//                 )}
//                 <form className="shareBottom" onSubmit={submitHandler}>
//                     <div className="shareOptions">
//                         <label htmlFor="file" className="shareOption">
//                             <PermMedia htmlColor="tomato" className="shareIcon" />
//                             <span className="shareOptionText">Photo or Video</span>
//                             <input
//                                 style={{ display: "none" }}
//                                 type="file"
//                                 id="file"
//                                 accept=".png,.jpeg,.jpg"
//                                 onChange={(e) => setFile(e.target.files[0])}
//                             />
//                         </label>

//                     </div>
//                     <button className="shareButton" type="submit">
//                         updatedPost Share
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }
import  React, {useState, useEffect }  from 'react';
import './myPost.css'
export default function UpdateProfilePhoto({submit, register, title}){
           const [image, setImage] = React.useState("")
           const [previewUrl, setPreviewUrl] = React.useState("")
           function imageHandler(e){
            if(e.target.files){
                 const pickedImage = e.target.files[0]
                 setImage(pickedImage)
                 console.log("PREVIEW", pickedImage )
            }
            else{
            }
           }
           useEffect(()=>{
                 if(image){
                              const imageReader = new FileReader()
                              imageReader.onload = ()=>{
                                    setPreviewUrl(imageReader.result)
                              }
                              imageReader.readAsDataURL(image)
                 }else{
                       return
                 }
           },[image])



           
      return(
                  <form className="user-action"  encType="multipart/form-data" onSubmit={submit}  >
                        <div className="form-group">
                              <label htmlFor="user-pic">{ title || "Selectioner une photo de profil" }</label>
                              <input type="file" id="user-pic" name="image" accept=".jpeg, .png, .jpg, .gif" onChange={imageHandler} ref={register}/>
                              { previewUrl &&
                                    <div className="profile-image-div ">
                                          <img src={previewUrl} alt=""/>
                                    </div>
                              }
                        </div>
                        <button type="submit">Mettre à jour</button>
                  </form>
      )
}
{/* <div className="image-preview"> */}
