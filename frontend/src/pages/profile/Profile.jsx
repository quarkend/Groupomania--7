import React, { useEffect, useState, Fragment, useContext } from 'react';
import { useForm } from 'react-hook-form'
import "./profile.css";
import { useParams, useHistory } from "react-router-dom";
import { AddAPhoto } from '@material-ui/icons';
import Feed from "../../components/feed/Feed"
import { AuthContext } from './../../App';
import UpdateProfilePhoto from './UpdateProfilePhoto';
import UpdateProfileUsername from './UpdateProfileUsername';
import UpdateProfileEmail from './UpdateProfileEmail';
// ^\s*$\n 
const DELETE_ACCOUNT_URL = "/delete/"
export default function Profile() {
      let { id } = useParams();
      let history = useHistory();
      const { state, dispatch } = React.useContext(AuthContext);
      const storage = JSON.parse(localStorage.getItem('user'));
      const userId = storage.id;
      let token = "Bearer " + storage.token;
      const auth = useContext(AuthContext)
      const [data, setData] = useState('')
      const { handleSubmit, register } = useForm()
      const [showUpdatePhoto, setShowUpdatePhoto] = useState(false);
      const [showUpdateEmail, setShowUpdateEmail] = useState(false)
      const [showUpdateUsername, setShowUpdateUsername] = useState(false)
      async function handleUpdateProfilePhoto(data) {
            const formData = new FormData()
            formData.append('image', data.image[0])
            const sendPhoto = await fetch(`${'http://localhost:8800/api/profile'}/${storage.id}`, {
                  method: 'put',
                  headers: {
                        Authorization: "Bearer " + token
                  },
                  body: formData
            })
            const response = await sendPhoto.json()
            console.log(response)
            //     getPostData()
            window.location.reload();
            setShowUpdatePhoto(false)
      }
      async function handleUpdateProfileEmail(data) {
            console.log(data)
            const { userId } = storage
            const sendedEmail = await fetch("http://localhost:8800/api/profile/" + userId, {
                  method: 'put',
                  headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token
                  },
                  body: JSON.stringify(data)
            })
            const response = await sendedEmail.json()
            console.log(response)
            getUserData()
            setShowUpdateEmail(false)
      }
      async function handleUpdateProfileUsername(data) {
            const { userId } = storage
            const sendedUsername = await fetch(`${'http://localhost:8800/api/profile'}/${storage.id}`, {
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
            setData(response)
            console.log(response)
      }
      useEffect(() => {
            getUserData()
            console.log(data.username)
      }, [])
      async function handleUpdateProfileEmail(data) {
            const sendedEmail = await fetch("http://localhost:8800/api/users/" + storage.id, {
                  method: 'put',
                  headers: {
                        "Content-Type": "application/json",
                        'Accept': 'application/json',
                        Authorization: "Bearer " + token
                  },
                  body: JSON.stringify(data)
            })
            const response = await sendedEmail.json()
            console.log(response)
            getUserData()
            setShowUpdateEmail(false)
      }
      async function deleteUser() {
            const conf = window.confirm('Etes vous sur de vouloir Supprimer definitivement votre compte ?')
            const URL = `"/delete/"${storage.id}`
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
                                          <img className="profileCoverImg" src="http://localhost:8800/images/1.jpg " alt="" />
                                          <img className="profileUserImg" src={"http://localhost:8800/images/" + data.profilePicture} alt="" />
                                          <div className="profileUserImgChange">
                                                <AddAPhoto onClick={() => {
                                                      setShowUpdatePhoto(!showUpdatePhoto)
                                                      setShowUpdateEmail(false)
                                                      setShowUpdateUsername(false)
                                                }} />
                                          </div>
                                    </div>
                                    <div className="profileInfo">
                                          <h4 className="profileInfoName">{data.username}</h4>
                                          <h4 className='profile-title'>MON COMPTE</h4>
                                          <Fragment>
                                                <div className="card">
                                                      <div className="postWrapper">
                                                            <h4>Username : {data.username}</h4>
                                                            <p>Email : {data.email}</p>
                                                            <p>Profil crée le : {state.user.createdAt.split('T').join(' à ').split('.000Z')}</p>
                                                            <p>Profil Modifié le : {state.user.updatedAt.split('T').join(' à ').split('.000Z')}</p>
                                                      </div>
                                                      <div className="user-action">
                                                            <i className="fas fa-user white fa-2x" onClick={() => {
                                                                  setShowUpdateUsername(!showUpdateUsername)
                                                                  setShowUpdateEmail(false)
                                                                  setShowUpdatePhoto(false)
                                                            }}
                                                            >  </i>
                                                            <i className="fas fa-envelope-open white fa-2x" onClick={() => {
                                                                  setShowUpdateEmail(!showUpdateEmail)
                                                                  setShowUpdatePhoto(false)
                                                                  setShowUpdateUsername(false)
                                                            }}>
                                                            </i>
                                                            <i className="fas fa-portrait white fa-2x" onClick={() => {
                                                                  setShowUpdatePhoto(!showUpdatePhoto)
                                                                  setShowUpdateEmail(false)
                                                                  setShowUpdateUsername(false)
                                                            }}>
                                                            </i>
                                                            <i className="fas fa-user-slash white fa-2x"  onClick={() => { history.push("/deleteuser/" + id) }}></i>
                
                                                      </div>
                                                      {showUpdatePhoto &&
                                                            <UpdateProfilePhoto submit={handleSubmit(handleUpdateProfilePhoto)} register={register({ required: true })} />
                                                      }
                                                      {showUpdateUsername &&
                                                            <UpdateProfileUsername submit={handleSubmit(handleUpdateProfileUsername)} register={register({ required: true })} />
                                                      }
                                                      {showUpdateEmail &&
                                                            <UpdateProfileEmail submit={handleSubmit(handleUpdateProfileEmail)} register={register({ required: true })} />
                                                      }
                                                </div>
                                          </Fragment>
                                    </div>
                              </div>
                              <div className="profileRightBottom">
                                    <Feed />
                              </div>
                        </div>
                  </div>
            </div>
      );
}
