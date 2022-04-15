import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import UpdateProfilePhoto from './UpdateProfilePhoto';
import UpdateProfileUsername from './UpdateProfileUsername';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form'
import UpdateProfileEmail from './UpdateProfileEmail';
import { AuthContext } from '../../App';

const POSTS_URL = "/posts/"
const url = "http://localhost:8800/images/"

export default function User({ user }) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    // eslint-disable-next-line
    const [data, setData] = useState('')
    const { handleSubmit, register } = useForm()
    const [showUpdatePhoto, setShowUpdatePhoto] = useState(false);
    const [showUpdateEmail, setShowUpdateEmail] = useState(false)
    const [showUpdateUsername, setShowUpdateUsername] = useState(false)
    const { state } = React.useContext(AuthContext);
    const history = useHistory();
    let { id } = useParams();
    const storage = JSON.parse(localStorage.getItem('user'));
    const token = "Bearer " + JSON.parse(localStorage.getItem('token'));
    const userId = state.user.id;
    async function handleUpdateProfilePhoto(data) {
        const formData = new FormData()
        formData.append('image', data.image[0])
        const sendPhoto = await fetch(`${'/users'}/${storage.id}`, {
            method: 'put',
            headers: {
                Authorization: "Bearer " + token
            },
            body: formData
        })
        const response = await sendPhoto.json()
        console.log(response)
        getPostData()
        setShowUpdatePhoto(false)
    }
    async function handleUpdateProfileUsername(data) {
        const sendedUsername = await fetch("http://localhost:8800/api/users/" + user.id, {
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
    async function handleUpdateProfileEmail(data) {
        const sendedEmail = await fetch("http://localhost:8800/api/users/" + user.id, {
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
    async function getUserData() {
        const URL = `${"/users/"}/${userId}`
        const data = await fetch(URL, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        const response = await data.json()
        setData(response)
        console.log(response)
        setIsLoaded(true);
        setError(error);
    }
    useEffect(() => {
        getUserData()
    }, [])
    async function getPostData() {
        const URL = `${POSTS_URL}`
        const data = await fetch(URL, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        const response = await data.json()
        setData(response)
        console.log(response)
        setIsLoaded(true);
        setError(error);
    }
    useEffect(() => {
        getPostData()
    }, [])
    useEffect(() => {
        getUserData()
    }, [])
   let idUser;
    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    } else
        if (state.user.id === id || state.user.isAdmin === true) {
            idUser = <div className="user-button">
                <Fragment>
                    <div className="card">
                       <div className="user-action">
                            <i className="fas fa-user white fa-3x" onClick={() => {
                                setShowUpdateUsername(!showUpdateUsername)
                                setShowUpdateEmail(false)
                                setShowUpdatePhoto(false)
                            }}
                            >  </i>
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
                            <i className="fas fa-user-slash white fa-3x" onClick={() => { history.push("/deleteuser/" + id) }}></i>
                        </div>
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
                </Fragment>
           </div>
        }
    return (
        <div className="card">
            <div className="detail">
            <div className="postTopRight">
                          
                            <h4 className="postDate">Compte Crée le : {user.createdAt.split('T').join(' à ').split('.000Z').join('')}</h4>
                        </div>
                <h3 > Username:{user.username} </h3>
                <h3 > Email:{user.email} </h3>
                <img className="postProfileImg"
                    src={
                       user.profilePicture
                            ? url + user.profilePicture
                            :  "/assets/person/noAvatar.png"
                    }
                    alt="user"
                />
               
             
                <div className="postsAdmin" >
                    <div >
                        {idUser}
                    </div>
                </div>
            </div>
        </div>
    )
}
