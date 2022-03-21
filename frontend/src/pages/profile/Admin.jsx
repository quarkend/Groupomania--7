import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import User from './User';
import "./profile.css"
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../App';
import UpdateProfilePhoto from './UpdateProfilePhoto';

import UpdateProfileUsername from './UpdateProfileUsername';
import { Fragment } from 'react';
import Post from './../../components/post/Post';
const POSTS_URL = "/posts/"
const UPDATE = "/users/"
const DELETE_ACCOUNT_URL = "/users/delete/"
export default function Admin({ submit, username }) {
    const auth = useContext(AuthContext)
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [post, setPost] = useState([]);
    let { id } = useParams();
    let history = useHistory();
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);
    const storage = JSON.parse(localStorage.getItem('user'));
    const token = "Bearer " +JSON.parse(localStorage.getItem('token'));
    const userId = storage.id;
    const userCredentials = JSON.parse(localStorage.getItem('user'))
    const [data, setData] = useState('')
    const { handleSubmit, register } = useForm()
    const [showUpdatePhoto, setShowUpdatePhoto] = useState(false);
    const [showUpdateEmail, setShowUpdateEmail] = useState(false)
    const [showUpdateUsername, setShowUpdateUsername] = useState(false)
    async function handleUpdateProfilePhoto(data) {
        const { userId } = userCredentials
        const formData = new FormData()
        formData.append('image', data.image[0])
        const sendPhoto = await fetch(`${'/users'}/${userCredentials.id}`, {
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
    async function handleUpdateProfileEmail(data) {
        console.log(data)
        const { userId } = userCredentials
        const sendedEmail = await fetch(UPDATE + userId, {
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
        const { userId } = userCredentials
        const sendedUsername = await fetch(`${'/users'}/${userCredentials.id}`, userId, {
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
        const URL = `${"/users/"}/${userId}`
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
    }
    useEffect(() => {
        getPostData()
    }, [])
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
    useEffect(() => {
        axios.get(`/users/${id}`,
            {
                headers:
                    { "Authorization": token }
            }).then((response) => {
                setUser(response.data)
                console.log(response.data)
                localStorage.setItem(' setLisuserIdX', JSON.stringify(response.data));
            });
    }, [id, token]);
    // useEffect(() => {
    //     axios.get(`/users`,
    //         {
    //             headers: { "Authorization": token}
    //         }).then((response) => {
    //             setUsers(response.data)
    //             localStorage.setItem(' setusers', JSON.stringify(response.data));
    //         });
    // }, [id]);
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users`,
                {
                    headers:
                        { "Authorization": token }
                }
            );
            setUsers(res.data);
            localStorage.setItem('userAount', JSON.stringify(res.data));
            console.log(res.data)
        };
        fetchUser();
    }, [token]);
    useEffect(() => {
        const fetchPost = async () => {
            const res = await axios.get("/users/" + id + "/posts/",
                {
                    headers:
                        { "Authorization": token }
                }
            );
            setPost(res.data);
            localStorage.setItem('userposts', JSON.stringify(res.data));
            console.log(res.data)
        };
        fetchPost();
    }, [token]);
    const deleteUserAccount = (id) => {
        axios.delete(`http://localhost:8800/api/users/${id}`,
            {
                headers: { "Authorization": token }
            }
        ).then(() => {
            history.push("/")
        })
        window.location.reload();
    }
    const updateUsename = (id) => {
        axios.put(`http://localhost:8800/api/users/${id}`,
            {
                headers: { "Authorization": token }
            }
        )
            .then(() => {
                history.push("/")
            })
    }
    return (
        <div className="profilePageContainer">
            <div className="profile">
                <div className="card">
                    <h1>admin</h1>
                    {/* <h4 className="detail"> {user.username}</h4> */}
                    <form className="signup-form margin" onSubmit={submit}  >
                        <div className="form-group">
                           <label htmlFor="username"> {storage.username || "Username"}</label> 
                            <input className="add-input" type="text" name="username" id="username" placeholder={username === undefined ? 'username...' : username} ref={register} />
                        </div>
                    </form>
                    <button onClick={() => { updateUsename(user.id) }}>updateUsename</button>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => { history.push("/deleteuser/" + id) }}>Supprimer</button>
               
                </div>
            </div>
            {users.map(u => (
                <User key={u.id} user={u} />
            ))}
            <Fragment>
                <h2 className='profile-title'>MON COMPTE</h2>
                <div className="card">
                    <div className="profile-image-div">
                        {/* <img src={"http://localhost:8800/images/" + user.profilePicture} alt=" profil" /> */}
                    </div>
                    <div className="user-info">
                        {/* <p>Username : {user.username}</p> */}
                        {/* <p>Email : {data.email}</p> */}
                        <p>Email : {storage.email}</p>
                        {/* <p>user.profilePicture: {user.profilePicture}</p> */}
                    </div>
           
                    <div className="user-action">
                        <i className="fas fa-user white fa-3x" onClick={() => {
                            setShowUpdateUsername(!showUpdateUsername)
                            setShowUpdateEmail(false)
                            setShowUpdatePhoto(false)
                        }}
                        >up usernam</i>
                        <i className="fas fa-envelope-open white fa-3x" onClick={() => {
                            setShowUpdateEmail(!showUpdateEmail)
                            setShowUpdatePhoto(false)
                            setShowUpdateUsername(false)
                        }}>up emil
                        </i>
                        <i className="fas fa-portrait white fa-3x" onClick={() => {
                            setShowUpdatePhoto(!showUpdatePhoto)
                            setShowUpdateEmail(false)
                            setShowUpdateUsername(false)
                        }}>up pho
                        </i>
                        <i className="fas fa-user-slash white fa-3x" onClick={deleteUser}></i>
                    </div>
                </div>
                {showUpdatePhoto &&
                    <UpdateProfilePhoto submit={handleSubmit(handleUpdateProfilePhoto)} register={register({ required: true })} />
                }
      
                {showUpdateUsername &&
                    <UpdateProfileUsername submit={handleSubmit(handleUpdateProfileUsername)} {...register({ required: true })} />
                }
            </Fragment>
        </div>
    );
}
