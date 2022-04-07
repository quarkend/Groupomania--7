import React, { useEffect, useState, Fragment, useContext } from 'react';
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { useForm } from 'react-hook-form'
import "./profile.css"
import { AddAPhoto} from '@material-ui/icons';
import Sidebar from "../../components/sidebar/Sidebar"
import Feed from "../../components/feed/Feed"

import { AuthContext } from './../../App';
import UpdateProfilePhoto from './UpdateProfilePhoto';

import UpdateProfileUsername from './UpdateProfileUsername';

// ^\s*$\n 
const POSTS_URL = "/posts/"

const DELETE_ACCOUNT_URL = "/users/delete/"
export default function Profile() {
    // let { id } = useParams();
    const { user } = useContext(AuthContext);
   const storage = JSON.parse(localStorage.getItem('user'));
   const userId = storage.id;
   let token = "Bearer " + storage.token;
   const auth = useContext(AuthContext)
    const userCredentials = JSON.parse(localStorage.getItem('user'))
    const [data, setData] = useState('')
    const { handleSubmit, register } = useForm()
   const [showUpdatePhoto, setShowUpdatePhoto] =  useState(false);
     const [showUpdateEmail, setShowUpdateEmail] = useState(false)
     const [showUpdateUsername, setShowUpdateUsername] = useState(false)
   async function handleUpdateProfilePhoto(data) {
        const formData = new FormData()
         formData.append('image', data.image[0])
          const sendPhoto = await fetch(`${'/profile'}/${userCredentials.id}` ,{
                method: 'put',
                headers: {
                      Authorization: "Bearer " + token
                },
                body: formData
          })
          const response = await sendPhoto.json()
          console.log(response)
      //     getPostData()
          setShowUpdatePhoto(false)
   }
   async function handleUpdateProfileEmail(data) {
          console.log(data)
          const { userId } = userCredentials
         const sendedEmail = await fetch("/profile/"+ userId, {
                method: 'put',
                headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " +token
                },
                body: JSON.stringify(data)
          })
          const response = await sendedEmail.json()
          console.log(response)
          getUserData()
          setShowUpdateEmail(false)
    }
   async function handleUpdateProfileUsername(data) {
          const {userId } = userCredentials
          const sendedUsername = await fetch(`${'http://localhost:8800/api/profile'}/${userCredentials.id}` ,{
                method: 'put',
                headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + token
                },
                body: JSON.stringify(data)
          })
          console.log(data)
          const response = await sendedUsername.json()
         getUserData()
         setShowUpdateUsername(true)
          console.log(response)
   }
   async function getUserData() {
     const URL = `${"http://localhost:8800/api/profile/"}${userId}`
     const data = await fetch(URL, {
            headers: {
                  Authorization: 'Bearer ' + token
            }
      })
      const response = await data.json()
     setData( response)
      console.log(response)
}
useEffect(() => {
      getUserData()
      console.log(data.username)
}, [])
//     async function getPostData() {
//          const URL = `${POSTS_URL}`
//          const data = await fetch(URL, {
//                 headers: {
//                       Authorization: 'Bearer ' + token
//                 }
//           })
//           const response = await data.json()
//          setData(response)
//           console.log(response)
//     }
//     useEffect(() => {
//           getPostData()
//     }, [])
   async function deleteUser() {
          const conf = window.confirm('Etes vous sur de vouloir Supprimer definitivement votre compte ?')
          const URL = `${DELETE_ACCOUNT_URL}/${userCredentials.id}`
         if (conf) {
                const sendedData = await fetch(URL, {
                      method: 'delete',
                      headers: {
                            Authorization: "Bearer " + token
                      },
                      body: JSON.stringify(data)
                })
                const response = await sendedData.json()
                console.log(response)
                auth.Logout()
          }
    }
   return (
       <div className="profilePageContainer">
           <div className="profile">
               <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                             <img className="profileCoverImg"  src={"http://localhost:8800/images/" +data.coverPicture} alt="" />  
                             <img className="profileUserImg" src={"http://localhost:8800/images/" + data.profilePicture}  alt="" />  
                           
                      
                        <div className="profileUserImgChange"> 
   
                        <AddAPhoto onClick={() => {
                                          setShowUpdatePhoto(!showUpdatePhoto)
                                          setShowUpdateEmail(false)
                                          setShowUpdateUsername(false)
                                    }}/> 
                      </div>
                      </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{storage.username}</h4>
                           <span  className='profile-title'>MON COMPTE</span>
                           <Fragment>
                        
                        <div className="card">
                   
                              {/* <div className="user-action">
                                    <i className="fas fa-user white fa-3x" onClick={() => {
                                          setShowUpdateUsername(!showUpdateUsername)
                                          setShowUpdateEmail(false)
                                          setShowUpdatePhoto(false)
                                    }}
                                    >   </i>
                                    <i className="fas fa-envelope-open white fa-3x" onClick={() => {
                                          setShowUpdateEmail(!showUpdateEmail)
                                          setShowUpdatePhoto(false)
                                          setShowUpdateUsername(false)
                                    }}>
                                    </i>
                                    <i className="fas fa-portrait white fa-3x" onClick={() => {
                                          setShowUpdatePhoto(!showUpdatePhoto)
                                          setShowUpdateEmail(false)
                                          setShowUpdateUsername(false)
                                    }}>
                                    </i>
                                    <i className="fas fa-user-slash white fa-3x" onClick={deleteUser}></i>
                              </div> */}
                       
                        {showUpdatePhoto &&
                              <UpdateProfilePhoto submit={handleSubmit(handleUpdateProfilePhoto)} register={register({ required: true })} />
                        }

                        {showUpdateUsername &&
                              <UpdateProfileUsername submit={handleSubmit(handleUpdateProfileUsername)} register={register({ required: true })} />
                        }
                         </div>
                  </Fragment>
                        </div>
                  </div>
                    <div className="profileRightBottom">
               
                    { data?     <Feed />  : ""}
                
                   </div>
                </div>
            </div>
       </div>
   );
}
