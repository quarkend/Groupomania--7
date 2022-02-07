import React, { useEffect, useState, Fragment, useContext, useCallback } from 'react';
import { useForm } from 'react-hook-form'
import './profile.css'
import { AuthContext } from './../../App';
import UpdateProfilePhoto from './UpdateProfilePhoto';
import UpdateProfileUsername from './UpdateProfileUsername';




const USER_INFO_URL = "http://localhost:8800/api/users/"
const UPDATE_USER_URL = "http://localhost:8800/api/users/"
const DELETE_ACCOUNT_URL = "http://localhost:8800/api/users/"

export default function UpdateUser() {
      
    
      const auth = useContext(AuthContext)
      const userCredentials = JSON.parse(localStorage.getItem('user'))
      const token = JSON.parse(localStorage.getItem('token'))
      const [data, setData] = useState('')
      const { handleSubmit, register } = useForm()
      const user = JSON.parse(localStorage.getItem('user'))
      const [showUpdatePhoto, setShowUpdatePhoto] = useState(false)
      const [showUpdateEmail, setShowUpdateEmail] = useState(false)
      const [showUpdateUsername, setShowUpdateUsername] = useState(false)
      async function handleUpdateProfilePhoto(data) {
            const { userId } = userCredentials
            const formData = new FormData()
            formData.append('image', data.image[0])
            // const imagedata = document.querySelector('input[type="file"]').files[0];
            // formData.append('image', imagedata);
            const sendPhoto = await fetch( "http://localhost:8800/api/users/"+ user.id, {
                  method: 'PUT',
                  headers: {

                        Authorization: "Bearer " + token
                  },
                 
                  body: formData
            })
            const response = await sendPhoto.json()
      
            getUserData()
            setShowUpdatePhoto(true)
            if (sendPhoto.ok) {
                  window.location.reload();
                  console.log(response)
            }
      }
      async function handleUpdateProfileEmail(data) {
            const { userId } = userCredentials
            const sendedEmail = await fetch( "http://localhost:8800/api/users/"+ user.id, {
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
      async function handleUpdateProfileUsername(data) {
            const { userId } = userCredentials
            const sendedUsername = await fetch( "http://localhost:8800/api/users/"+ user.id, {
                  method: 'put',
                  headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token
                  },
                  body: JSON.stringify(data)
            })
            const response = await sendedUsername.json()
            console.log(response)
            getUserData()
            setShowUpdateUsername(false)
      }
      async function getUserData() {
            const URL = `${USER_INFO_URL}/${user.id}`
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
      }, [])
      async function deleteUser() {
            const conf = window.confirm('Etes vous sur de vouloir Supprimer definitivement votre compte ?')
            const URL = `${ "http://localhost:8800/api/users/"}/${userCredentials.id}`
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
      if (data) {
            return (
                  <Fragment>
                        <h2 className='profile-title'>MON COMPTE</h2>
                        <div className="card">
                              <div className="profile-image-div">
                                    <img src={"http://localhost:8800/images/" + data.profilePicture} alt="profile" />
                              </div>
                              <div className="user-info">
                              <p>image : {data.image}</p>
                                    <p>Username : {data.username}</p>
                                    <p>Email : {data.email}</p>
                                    <p>Profil crée le : {data.createdAt.split('T').join(' à ').split('.000Z')}</p>
                                    <p>Profil Modifié le : {data.updatedAt.split('T').join(' à ').split('.000Z')}</p>
                              </div>
                              <div className="user-action">
                                    <i className="fas fa-user white fa-3x" onClick={() => {
                                          setShowUpdateUsername(!showUpdateUsername)
                                          setShowUpdateEmail(false)
                                          setShowUpdatePhoto(false)
                                    }}
                                    >  UpdateUsername </i>
                                    <i className="fas fa-envelope-open white fa-3x" onClick={() => {
                                          setShowUpdateEmail(!showUpdateEmail)
                                          setShowUpdatePhoto(false)
                                          setShowUpdateUsername(false)
                                    }}>setShowUpdateEmail
                                    </i>
                                    <i className="fas fa-portrait white fa-3x" onClick={() => {
                                          setShowUpdatePhoto(!showUpdatePhoto)
                                          setShowUpdateEmail(false)
                                          setShowUpdateUsername(false)
                                    }}>UpdatePhoto
                                    </i>
                                    <i className="fas fa-user-slash white fa-3x" onClick={deleteUser}></i>
                              </div>
                       
                        {showUpdatePhoto &&
                              <UpdateProfilePhoto submit={handleSubmit(handleUpdateProfilePhoto)} register={register({ required: true })} />
                        }
s
                        {showUpdateUsername &&
                              <UpdateProfileUsername submit={handleSubmit(handleUpdateProfileUsername)} register={register({ required: true })} />
                        }
                         </div>
                  </Fragment>
            )
      }
      return ('')
}